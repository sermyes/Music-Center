import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Youtube from './service/youtube';
import PostRespository from './service/post_respository';
import Modal from './components/modal/modal';
import VideoDetail from './components/videoDetail/videoDetail';
import Navigation from './components/navigation/navigation';
import MusicUpdate from './components/musicUpdate/musicUpdate';
import Main from './components/main/main';
import MusicList from './components/musicList/musicList';
import MusicRequest from './components/musicRequest/musicRequest';

interface AppProps {
  youtube: Youtube;
  postRespository: PostRespository;
}

export type Video = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
};

type Thumbnails = {
  default: object;
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: object;
  standard: object;
  maxres: object;
};

type ResourceId = {
  kind: string;
  videoId: string;
};

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
        <Modal onClose={onVideoClick}>
          <VideoDetail video={selectedVideo} />
        </Modal>
      )}
    </div>
  );
}

export default App;
