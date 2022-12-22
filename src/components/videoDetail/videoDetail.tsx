import { Video } from '../../service/youtube';
import styles from './videoDetail.module.css';

interface VideoDetailProps {
  video: Video;
}
const VideoDetail = ({ video }: VideoDetailProps) => {
  return (
    <div className={styles.container} data-testid='detail_video'>
      <iframe
        className={styles.video}
        title='youtube player'
        width='100%'
        src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
        allowFullScreen
      ></iframe>
      <h2 className={styles.title}>{video.snippet.title}</h2>
    </div>
  );
};

export default VideoDetail;
