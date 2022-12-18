import { useEffect, useState } from 'react';
import styles from './app.module.css';
import Youtube, { Video } from './service/youtube';
import PostRespository, {
  Post,
  PostData,
  Posts
} from './service/post_respository';
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
  const [updatedVideos, setUpdatedVideos] = useState<Video[] | []>([]);
  const [posts, setPosts] = useState<Posts>({});

  const onVideoClick = (video: Video | null) => {
    setSelectedVideo(video);
  };

  const savePost = (post: Post, key: string) => {
    postRespository.savePost(post, key);
  };

  const removePost = (post: PostData) => {
    postRespository.removePost(post);
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
        setUpdatedVideos(
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

  useEffect(() => {
    const stopRead = postRespository.getPost((postData) => {
      setPosts(postData);
    });
    return () => stopRead();
  }, [postRespository]);

  return (
    <div className={`${styles.container} pageContainer`}>
      <section className={`mainSection ${styles.section} ${styles.main}`}>
        <Main />
      </section>
      <section className={`updatedSection ${styles.updated} ${styles.section}`}>
        <MusicUpdate
          onVideoClick={onVideoClick}
          updatedVideos={updatedVideos}
        />
      </section>
      <section className={`listSection ${styles.list} ${styles.section}`}>
        <MusicList videos={videos} onVideoClick={onVideoClick} />
      </section>
      <section className={`requestSection ${styles.section} ${styles.request}`}>
        <MusicRequest
          savePost={savePost}
          removePost={removePost}
          postsData={posts}
        />
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
