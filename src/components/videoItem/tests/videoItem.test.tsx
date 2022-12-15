import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import VideoItem from '../videoItem';
import { fakeVideo } from '../../tests/videos';

describe('VideoItem', () => {
  const video = fakeVideo;

  const onVideoClick = jest.fn();

  it('renders correctly', () => {
    const component = renderer.create(
      <VideoItem video={video} onVideoClick={onVideoClick} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  beforeEach(() => {
    render(<VideoItem video={video} onVideoClick={onVideoClick} />);
  });

  it('renders video item', () => {
    const img = screen.getByRole('img')! as HTMLImageElement;

    expect(img.src).toBe(video.snippet.thumbnails.medium.url);
    expect(img.alt).toBe(video.snippet.title);
    expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
  });

  it('calls onVideoClick with video when clicked', async () => {
    const videoItem = screen.getByTitle('video');
    await userEvent.click(videoItem);

    expect(onVideoClick).toHaveBeenCalledTimes(1);
    expect(onVideoClick).toHaveBeenCalledWith(video);
  });
});
