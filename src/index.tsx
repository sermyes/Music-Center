import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import Youtube from './service/youtube';
import firebaseApp from './service/firebase';
import '@fortawesome/fontawesome-free/js/all.js';
import PostRespository from './service/post_respository';
import App from './app';

const client = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY }
});

const youtube = new Youtube(client);
const postRespository = new PostRespository(firebaseApp);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App youtube={youtube} postRespository={postRespository} />
  </React.StrictMode>
);
