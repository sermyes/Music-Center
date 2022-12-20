import { useEffect, useState, useCallback, useRef } from 'react';
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
  const mainRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const updateRef = useRef<HTMLElement>(null);
  const requestRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState<number>(0);

  const onVideoClick = (video: Video | null) => {
    setSelectedVideo(video);
  };

  const savePost = (post: Post, key: string) => {
    postRespository.savePost(post, key);
  };

  const removePost = (post: PostData) => {
    postRespository.removePost(post);
  };

  const keyupHandler = useCallback(
    (e: KeyboardEvent) => {
      if (!(e.code === 'ArrowUp' || e.code === 'ArrowDown')) {
        return;
      }
      let nextIndex = 0;
      if (e.code === 'ArrowUp') {
        nextIndex = index - 1 < 0 ? 0 : index - 1;
      } else if (e.code === 'ArrowDown') {
        nextIndex = index + 1 > 3 ? 3 : index + 1;
      }

      moveTo(nextIndex);
      onNavActive(nextIndex);
      setIndex(nextIndex);
    },
    [setIndex, index]
  );
  const updateIndex = (idx: number) => {
    setIndex(idx);
  };

  const onWheel = useCallback(
    (e: any) => {
      e.preventDefault();
      let nextIndex;

      if (e.deltaY < 0) {
        nextIndex = index - 1 < 0 ? 0 : index - 1;
      } else {
        nextIndex = index + 1 > 3 ? 3 : index + 1;
      }
      moveTo(nextIndex);
      onNavActive(nextIndex);
      setIndex(nextIndex);
    },
    [setIndex, index]
  );

  const onNavActive = (index: number) => {
    const menus = document.querySelectorAll('.menu');
    menus.forEach((menu, idx) => {
      if (idx === index) {
        menu.classList.add('active');
      } else {
        menu.classList.remove('active');
      }
    });
  };

  const moveTo = (index: number) => {
    let offset;
    switch (index) {
      case 0:
        offset = mainRef.current!.offsetTop;
        break;
      case 1:
        offset = updateRef.current!.offsetTop;
        break;
      case 2:
        offset = listRef.current!.offsetTop;
        break;
      case 3:
        offset = requestRef.current!.offsetTop;
        break;
      default:
        throw new Error('not supported index');
    }

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    youtube
      .playList()
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
      .catch((error) => console.log(error));
  }, [youtube]);

  useEffect(() => {
    const stopRead = postRespository.getPost((postData) => {
      setPosts(postData);
    });
    return () => stopRead();
  }, [postRespository]);

  useEffect(() => {
    window.addEventListener('keyup', keyupHandler);
    mainRef.current!.addEventListener('wheel', onWheel, { passive: false });
    updateRef.current!.addEventListener('wheel', onWheel, { passive: false });
    listRef.current!.addEventListener('wheel', onWheel, { passive: false });
    requestRef.current!.addEventListener('wheel', onWheel, { passive: false });

    return () => window.removeEventListener('keyup', keyupHandler);
  }, [keyupHandler, mainRef, updateRef, listRef, requestRef, onWheel]);

  useEffect(() => {
    const idx = Math.round(window.scrollY / mainRef.current!.scrollHeight);
    setIndex(idx);
    onNavActive(idx);
  }, [setIndex]);

  return (
    <div className={`${styles.container} pageContainer`}>
      <section
        ref={mainRef}
        className={`mainSection ${styles.section} ${styles.main}`}
      >
        <Main />
      </section>
      <section
        ref={updateRef}
        className={`updatedSection ${styles.updated} ${styles.section}`}
      >
        <MusicUpdate
          onVideoClick={onVideoClick}
          updatedVideos={updatedVideos}
        />
      </section>
      <section
        ref={listRef}
        className={`listSection ${styles.list} ${styles.section}`}
      >
        <MusicList videos={videos} onVideoClick={onVideoClick} />
      </section>
      <section
        ref={requestRef}
        className={`requestSection ${styles.section} ${styles.request}`}
      >
        <MusicRequest
          savePost={savePost}
          removePost={removePost}
          postsData={posts}
        />
      </section>
      <Navigation
        moveTo={moveTo}
        updateIndex={updateIndex}
        onActive={onNavActive}
      />
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
