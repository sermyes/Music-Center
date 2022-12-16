import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Youtube, { Video } from './service/youtube';
import PostRespository from './service/post_respository';
import Modal from './components/modal/modal';
import VideoDetail from './components/videoDetail/videoDetail';
import Navigation from './components/navigation/navigation';
import MusicUpdate from './components/musicUpdate/musicUpdate';
import Main from './components/main/main';
import MusicList from './components/musicList/musicList';
import MusicRequest from './components/musicRequest/musicRequest';
import Portal from './components/portal/portal';

interface AppProps {
  youtube: Youtube;
  postRespository: PostRespository;
}

function App({ youtube, postRespository }: AppProps) {
  const [videos, setVideos] = useState<Video[] | []>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [updatedVideo, setUpdatedVideo] = useState<Video[] | []>([]);

  const onVideoClick = (video: Video | null) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    youtube
      .playList() //
      .then((videos) => {
        setVideos(
          videos.filter(
            (video: Video) =>
              video.snippet.title !== 'Deleted video' &&
              video.snippet.title !== 'Private video'
          )
        );
        setUpdatedVideo(
          videos
            .sort((a: Video, b: Video) => {
              return a.snippet.publishedAt < b.snippet.publishedAt ? 1 : -1;
            })
            .slice(0, 3)
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [youtube]);

  return (
    <div className={`${styles.container} pageContainer`}>
      <section className={`mainSection ${styles.section} ${styles.main}`}>
        <Main />
      </section>
      <section className={`updatedSection ${styles.updated} ${styles.section}`}>
        <MusicUpdate onVideoClick={onVideoClick} updatedVideo={updatedVideo} />
      </section>
      <section className={`listSection ${styles.list} ${styles.section}`}>
        <MusicList videos={videos} onVideoClick={onVideoClick} />
      </section>
      <section className={`requestSection ${styles.section} ${styles.request}`}>
        <MusicRequest postRespository={postRespository} />
      </section>
      <Navigation />
      {selectedVideo && (
        <Portal elementId='modal-root'>
          <Modal onClose={onVideoClick}>
            <VideoDetail video={selectedVideo} />
          </Modal>
        </Portal>
      )}
    </div>
  );
}

export default App;
