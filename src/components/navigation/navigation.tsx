import { memo, useRef, useState } from 'react';
import styles from './navigation.module.css';

interface NavigationProps {
  moveTo(index: number): void;
  updateIndex(index: number): void;
  onActive(index: number): void;
}

const Navigation = memo(
  ({ moveTo, updateIndex, onActive }: NavigationProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLElement>(null);
    const [active, setActive] = useState(false);

    const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
      const index = parseInt(e.currentTarget.dataset.index! as string);
      moveTo(index);
      onActive(index);
      updateIndex(index);
    };

    const onMui = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const icon = document.querySelector('.icon')! as HTMLElement;
      if (active) {
        wrapperRef.current!.classList.remove('on');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
        setActive(false);
      } else {
        wrapperRef.current!.classList.add('on');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        setActive(true);
      }
    };
    // Mobile Menu

    return (
      <nav className={styles.nav}>
        <button className={styles.btn} onClick={onMui} data-testid='mui'>
          <i className={`${styles.icon} icon fas fa-bars`} ref={iconRef}></i>
        </button>
        <div className={`${styles.wrapper} mui`} ref={wrapperRef}>
          <ul className={styles.ul}>
            <li
              className={`${styles.menu} menu`}
              data-index='0'
              data-testid='navi'
              onClick={onClick}
            >
              <i className={`${styles.ico} fas fa-home`}></i>
              <span className={`${styles.text} ${styles.muiText}`}>Home</span>
            </li>
            <li
              className={`${styles.menu} menu`}
              data-index='1'
              data-testid='navi'
              onClick={onClick}
            >
              <span className={styles.text}>New</span>
            </li>
            <li
              className={`${styles.menu} menu`}
              data-index='2'
              data-testid='navi'
              onClick={onClick}
            >
              <i className={`${styles.ico} fas fa-music`}></i>
              <span className={`${styles.text} ${styles.muiText}`}>List</span>
            </li>
            <li
              className={`${styles.menu} menu`}
              data-index='3'
              data-testid='navi'
              onClick={onClick}
            >
              <i className={`${styles.ico} fas fa-comment`}></i>
              <span className={`${styles.text} ${styles.muiText}`}>
                Comment
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
);

export default Navigation;
