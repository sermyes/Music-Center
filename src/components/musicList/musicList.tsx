import React from 'react';
import { Video } from '../../app';
import VideoItem from '../videoItem/videoItem';
import styles from './musicList.module.css';
import SimpleSlider from './../simpleSlider/simpleSlider';

interface MusicListProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}
const MusicList = ({ videos, onVideoClick }: MusicListProps) => {
  const settings = {
    onArrow: true,
    onDots: true,
    slideToShow: 3,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slideToShow: 2,
          onArrow: true,
          onDots: false
        }
      }
    ]
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Music List</h2>
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <SimpleSlider settings={settings}>
            {videos &&
              videos.map((video) => (
                <VideoItem
                  key={video.id}
                  video={video}
                  onVideoClick={onVideoClick}
                />
              ))}
          </SimpleSlider>
        </div>
      </div>
    </>
  );
};

export default MusicList;
