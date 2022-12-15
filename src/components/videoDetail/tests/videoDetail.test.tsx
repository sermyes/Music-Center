import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import VideoDetail from './../videoDetail';
import { fakeVideo } from '../../tests/videos';

describe('Video Detail', () => {
  const video = fakeVideo;

  it('renders correctly', () => {
    const component = renderer.create(<VideoDetail video={video} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders video detail', () => {
    render(<VideoDetail video={video} />);

    const iframe = screen.getByTitle('youtube player')! as HTMLIFrameElement;
    const heading = screen.getByRole('heading');

    expect(iframe.src).toBe('https://www.youtube.com/embed/1');
    expect(heading.textContent).toBe(video.snippet.title);
  });
});
