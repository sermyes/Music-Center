import React, { useState } from 'react';
import BoardItem from '../boardItem/boardItem';
import BoardForm from '../boardForm/boardForm';
import styles from './board.module.css';
import { Scrollbars } from 'rc-scrollbars';
import { Admin, Post, PostData } from '../../service/post_respository';

interface BoardProps {
  onConfirm(post: Post, key: string): void;
  onRemove(post: PostData): void;
  posts: PostData[] | [];
  notices: PostData[] | [];
  admin: Admin;
}

const Board = ({ onConfirm, onRemove, posts, notices, admin }: BoardProps) => {
  const [active, setActive] = useState<Boolean>(false);
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target! as HTMLElement;
    const optionBtns = document.querySelectorAll('.optionBtn');

    optionBtns.forEach((btn) => {
      btn.classList.remove('active');
    });

    if (target.matches('.optionBtn') && !active) {
      setActive(true);
      target.classList.add('active');
    } else {
      setActive(false);
      target.classList.remove('active');
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.lists} boardList`} onClick={onClick}>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <ul>
            {notices &&
              notices.map((notice) => (
                <BoardItem
                  key={notice.key}
                  onRemove={onRemove}
                  notice={notice}
                  admin={admin}
                />
              ))}
          </ul>
          <ul>
            {posts &&
              posts.map((post) => (
                <BoardItem
                  key={post.key}
                  onRemove={onRemove}
                  post={post}
                  admin={admin}
                />
              ))}
          </ul>
        </Scrollbars>
      </div>
      <div className={styles.form}>
        <BoardForm onConfirm={onConfirm} admin={admin} />
      </div>
    </div>
  );
};

export default Board;
