import MusicList from '../musicList';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { fakeVideos } from '../../tests/videos';
import userEvent from '@testing-library/user-event';

describe('Music List', () => {
  const videos = [...fakeVideos, ...fakeVideos];
  const onVideoClick = jest.fn();

  it('renders correctly', () => {
    const component = renderer.create(
      <MusicList videos={videos} onVideoClick={onVideoClick} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('calls onVideoClick with video when clicked', async () => {
    render(<MusicList videos={videos} onVideoClick={onVideoClick} />);
    const videoItem = screen.getAllByRole('img');
    await userEvent.click(videoItem[1]);

    expect(onVideoClick).toHaveBeenCalledTimes(1);
    expect(onVideoClick).toHaveBeenCalledWith(videos[1]);
  });
});
