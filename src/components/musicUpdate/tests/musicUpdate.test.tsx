import MusicUpdate from '../musicUpdate';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { fakeVideos } from '../../tests/videos';
import userEvent from '@testing-library/user-event';

describe('Music Update', () => {
  const videos = fakeVideos;
  const onVideoClick = jest.fn();

  it('renders correctly', () => {
    const component = renderer.create(
      <MusicUpdate updatedVideos={videos} onVideoClick={onVideoClick} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('calls onVideoClick with video when clicked', async () => {
    render(<MusicUpdate updatedVideos={videos} onVideoClick={onVideoClick} />);
    const videoItem = screen.getByText('title2');
    await userEvent.click(videoItem);

    expect(onVideoClick).toHaveBeenCalledTimes(1);
    expect(onVideoClick).toHaveBeenCalledWith(videos[1]);
  });
});
