import MusicRequest from '../musicRequest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { fakePosts } from './../../tests/posts';
import PostRespository, {
  ReadListener
} from '../../../service/post_respository';
import firebaseApp from '../../../service/firebase';

describe('Music Request', () => {
  let postRespository: PostRespository;
  beforeEach(() => {
    postRespository = new PostRespository(firebaseApp);
    jest
      .spyOn(postRespository, 'getPost')
      .mockImplementation((onRead: ReadListener) => {
        onRead(fakePosts);
        return () => {};
      });
  });

  it('renders correctly', () => {
    // const component = renderer.create(
    //   <MusicRequest postRespository={postRespository} />
    // );
    // expect(component.toJSON()).toMatchSnapshot();
  });
});
