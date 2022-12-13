import React, { memo } from 'react';
import { Video } from '../../app';
import styles from './videoItem.module.css';

interface VideoItemProps {
  video: Video;
  onVideoClick: (video: Video) => void;
}

const VideoItem = memo(({ video, onVideoClick }: VideoItemProps) => {
  const onClick = () => {
    onVideoClick(video);
  };
  return (
    <div className={styles.video} onClick={onClick}>
      <img
        className={styles.thumbnail}
        src={
          video.snippet.thumbnails.medium && video.snippet.thumbnails.medium.url
        }
        alt=''
      />
      <div className={styles.metadata}>
        <p className={styles.title}>{video.snippet.title}</p>
      </div>
    </div>
  );
});

export default VideoItem;