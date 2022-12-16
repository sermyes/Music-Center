import React, { useEffect } from 'react';
import { Video } from '../../service/youtube';
import Portal from '../portal/portal';
import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: (video: Video | null) => void;
}

function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const htmlElement = document.querySelector('html')! as HTMLHtmlElement;
    const scrollY = htmlElement.scrollTop;
    document.body.style.cssText = `position:fixed; top:-${scrollY}px;`;
    return () => {
      document.body.style.cssText = `position:static; top:'';`;
      htmlElement.scrollTop = scrollY;
    };
  });

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <button
            className={styles.iconBtn}
            onClick={() => {
              onClose(null);
            }}
          >
            <i className={`${styles.icon} fas fa-times`} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
