import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Youtube from './service/youtube';
import firebaseApp from './service/firebase';
import '@fortawesome/fontawesome-free/js/all.js';
import PostRespository from './service/post_respository';
import App from './app';
import { youtubeClient } from './service/youtube_client';

const youtube = new Youtube(youtubeClient);
const postRespository = new PostRespository(firebaseApp);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App youtube={youtube} postRespository={postRespository} />
  </React.StrictMode>
);
