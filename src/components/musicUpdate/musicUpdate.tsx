import { Video } from '../../app';
import VideoItem from '../videoItem/videoItem';
import styles from './musicUpdate.module.css';

interface MusicUpdateProps {
  updatedVideo: Video[];
  onVideoClick: (video: Video) => void;
}

const MusicUpdate = ({ updatedVideo, onVideoClick }: MusicUpdateProps) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Updated Music</h2>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          {updatedVideo &&
            updatedVideo.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                onVideoClick={onVideoClick}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MusicUpdate;
