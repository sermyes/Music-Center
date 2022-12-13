import React, { useEffect } from 'react';
import { Video } from '../../app';
import Portal from '../portal/portal';
import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: (video: Video | null) => void;
}

function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.cssText = `position:fixed`;
  });

  return (
    <Portal elementId='modal-root'>
      <div className={styles.overlay} />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <button className={styles.iconBtn} onClick={() => onClose(null)}>
            <i className={`${styles.icon} fas fa-times`} />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
