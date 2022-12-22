import App from '../../app';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import PostRespository from '../../service/post_respository';
import Youtube from '../../service/youtube';
import { fakeVideos } from './videos';
import firebaseApp from './../../service/firebase';
import { youtubeClient } from './../../service/youtube_client';

jest.mock('axios', () => {
  return {
    create: jest.fn()
  };
});
jest.mock('../../service/youtube');
jest.mock('../../service/post_respository');

describe('App', () => {
  const youtube = new Youtube(youtubeClient);
  youtube.playList = jest.fn().mockReturnValue(fakeVideos);
  const postRespository = new PostRespository(firebaseApp);

  it('renders correctly', () => {
    const component = renderer.create(
      <App youtube={youtube} postRespository={postRespository} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
