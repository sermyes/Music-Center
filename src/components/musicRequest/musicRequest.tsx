import { useEffect, useState } from 'react';
import styles from './musicRequest.module.css';
import PostRespository from './../../service/post_respository';

interface MusicRequestProps {
  postRespository: PostRespository;
}
const MusicRequest = ({ postRespository }: MusicRequestProps) => {
  // const [posts, setPosts] = useState([]);
  // const [notices, setNotices] = useState([]);
  // const [admin, setAdmin] = useState([]);
  // const onConfirm = (post, key) => {
  //   postRespository.savePost(post, key);
  // };

  // const onRemove = (post, key) => {
  //   postRespository.removePost(post, key);
  // };

  // useEffect(() => {
  //   const stopRead = postRespository.getPost((posts) => {
  //     const question =
  //       posts.question &&
  //       Object.keys(posts.question).map((key) => posts.question[key]);
  //     const post =
  //       posts.post && Object.keys(posts.post).map((key) => posts.post[key]);

  //     setPosts(() => {
  //       let updated = [];
  //       if (question && post) {
  //         updated = [...question, ...post];
  //       } else if (question && !post) {
  //         updated = [...question];
  //       } else if (post && !question) {
  //         updated = [...post];
  //       } else {
  //         return;
  //       }

  //       updated = updated.sort((a, b) => (a.date > b.date ? -1 : 1));
  //       return updated;
  //     });

  //     setNotices(
  //       posts.notice &&
  //         Object.keys(posts.notice).map((key) => posts.notice[key])
  //     );
  //     setAdmin(posts.admin && posts.admin);
  //   });

  //   return () => stopRead();
  // }, [postRespository]);

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Music Request</h2>
      </div>
      <div className={styles.boardContainer}>
        <div className={styles.board} id={styles.style}>
          {/* <Board
            onConfirm={onConfirm}
            onRemove={onRemove}
            posts={posts}
            notices={notices}
            admin={admin}
          /> */}
        </div>
      </div>
    </>
  );
};

export default MusicRequest;
