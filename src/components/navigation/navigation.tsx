import { memo } from 'react';
import styles from './navigation.module.css';

const Navigation = memo(() => {
  return <h1 className={styles.nav}>Navigation</h1>;
});

export default Navigation;
