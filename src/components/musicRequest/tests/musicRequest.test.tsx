import MusicRequest from '../musicRequest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { fakePosts } from './../../tests/posts';

describe('Music Request', () => {
  const posts = fakePosts;
  const savePost = jest.fn();
  const removePost = jest.fn();

  beforeEach(() => {});

  it('renders correctly', () => {
    const component = renderer.create(
      <MusicRequest
        postsData={posts}
        savePost={savePost}
        removePost={removePost}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
