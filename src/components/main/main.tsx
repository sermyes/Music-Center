import { memo } from 'react';
import styles from './main.module.css';

const Main = memo(() => {
  const onClick = () => {
    const updatedSection = document.querySelector(
      '.updatedSection'
    )! as HTMLElement;
    const location = updatedSection.offsetTop;
    window.scrollTo({ top: location, left: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Music Center</h1>
          <p className={styles.description}>
            Free Youtube Music, Melon Top100, Club Music, Show me the money ...
          </p>
        </div>
        <div className={styles.contactContainer}>
          <a href='mailto:sermyes@gmail.com' className={styles.contact}>
            <i className={`${styles.contact_icon} fas fa-envelope`} />
          </a>
          <a href='tel:010-6807-5339' className={styles.contact}>
            <i className={`${styles.contact_icon} fas fa-phone`} />
          </a>
          <a
            href='https://github.com/sermyes/musicCenter'
            className={styles.contact}
          >
            <i className={`${styles.contact_icon} fab fa-github`} />
          </a>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={onClick}>
          <i className={`${styles.icon} fas fa-music`} />
          Listen Music
        </button>
      </div>
    </div>
  );
});

export default Main;
