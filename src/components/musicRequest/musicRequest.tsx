import React, { useEffect, useState } from 'react';
import Board from '../board/board';
import styles from './musicRequest.module.css';
import PostRespository, {
  Post,
  PostData,
  Admin
} from './../../service/post_respository';

interface MusicRequestProps {
  postRespository: PostRespository;
}

const MusicRequest = ({ postRespository }: MusicRequestProps) => {
  const [posts, setPosts] = useState<PostData[] | []>([]);
  const [notices, setNotices] = useState<PostData[] | []>([]);
  const [admin, setAdmin] = useState<Admin>({ name: '', psw: '0000' });
  const onConfirm = (post: Post, key: string) => {
    postRespository.savePost(post, key);
  };

  const onRemove = (post: PostData) => {
    postRespository.removePost(post);
  };

  useEffect(() => {
    const stopRead = postRespository.getPost((posts) => {
      const question =
        posts.question &&
        Object.keys(posts.question).map((key) => posts.question[key]);
      const post =
        posts.post && Object.keys(posts.post).map((key) => posts.post[key]);
      let updated: PostData[];
      if (question && post) {
        updated = [...question, ...post];
      } else if (question && !post) {
        updated = [...question];
      } else if (post && !question) {
        updated = [...post];
      } else {
        return;
      }

      updated = updated.sort((a, b) => (a.date > b.date ? -1 : 1));
      setPosts(updated);

      setNotices(
        posts.notice &&
          Object.keys(posts.notice).map((key) => posts.notice[key])
      );
      setAdmin(posts.admin && posts.admin);
    });

    return () => stopRead();
  }, [postRespository]);

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Music Request</h2>
      </div>
      <div className={styles.boardContainer}>
        <div className={styles.board} id={styles.style}>
          <Board
            onConfirm={onConfirm}
            onRemove={onRemove}
            posts={posts}
            notices={notices}
            admin={admin}
          />
        </div>
      </div>
    </>
  );
};

export default MusicRequest;
