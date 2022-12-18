import { useEffect, useState } from 'react';
import Board from '../board/board';
import styles from './musicRequest.module.css';
import { Post, PostData, Admin, Posts } from './../../service/post_respository';

interface MusicRequestProps {
  savePost(post: Post, key: string): void;
  removePost(post: PostData): void;
  postsData: Posts;
}

const MusicRequest = ({
  savePost,
  removePost,
  postsData
}: MusicRequestProps) => {
  const [posts, setPosts] = useState<PostData[] | []>([]);
  const [notices, setNotices] = useState<PostData[] | []>([]);
  const [admin, setAdmin] = useState<Admin>({ name: '', psw: '' });

  const onConfirm = (post: Post, key: string) => {
    savePost(post, key);
  };

  const onRemove = (post: PostData) => {
    removePost(post);
  };

  useEffect(() => {
    const question =
      (postsData.question &&
        Object.keys(postsData.question).map(
          (key) => postsData.question![key]
        )) ||
      [];
    const post =
      (postsData.post &&
        Object.keys(postsData.post).map((key) => postsData.post![key])) ||
      [];
    let updated: PostData[];
    updated = [...post, ...question];

    updated = updated.sort((a, b) => (a.date > b.date ? -1 : 1));
    setPosts(updated);

    setNotices(
      (postsData.notice &&
        Object.keys(postsData.notice).map((key) => postsData.notice![key])) ||
        []
    );
    setAdmin(postsData.admin || { name: 'admin', psw: '0000' });
  }, [postsData]);

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
