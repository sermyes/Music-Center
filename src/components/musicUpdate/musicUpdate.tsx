import { Video } from '../../service/youtube';
import VideoItem from '../videoItem/videoItem';
import styles from './musicUpdate.module.css';

interface MusicUpdateProps {
  updatedVideos: Video[];
  onVideoClick: (video: Video) => void;
}

const MusicUpdate = ({ updatedVideos, onVideoClick }: MusicUpdateProps) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Updated Music</h2>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          {updatedVideos &&
            updatedVideos.map((video) => (
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
