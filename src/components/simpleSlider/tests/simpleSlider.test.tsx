import SimpleSlider from '../simpleSlider';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface VideoItemProps {
  video: fakeVideo;
}
type fakeVideo = {
  id: number;
};
const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <div>
      <p>{video.id}</p>
    </div>
  );
};

describe('SimpleSlider', () => {
  const settings = {
    onArrow: true,
    onDots: true,
    slideToShow: 3
  };

  const videos = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 }
  ];

  it('renders correctly', () => {
    const component = renderer.create(
      <SimpleSlider settings={settings}>
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </SimpleSlider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders Slier with arrow and dots', async () => {
    render(
      <SimpleSlider settings={settings}>
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </SimpleSlider>
    );

    const dots = screen.getAllByRole('listitem');
    expect(dots.length).toBe(2);
    const arrows = screen.getAllByTestId('arrow');
    expect(arrows.length).toBe(2);

    await userEvent.click(arrows[0]);
    expect(dots[1]).toHaveClass('active');

    await userEvent.click(arrows[1]);
    expect(dots[0]).toHaveClass('active');

    await userEvent.click(dots[1]);
    expect(dots[1]).toHaveClass('active');
  });

  it('renders Slier without arrow and dots', async () => {
    const settingsWithoutOption = {
      onArrow: false,
      onDots: false,
      slideToShow: 3
    };
    render(
      <SimpleSlider settings={settingsWithoutOption}>
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </SimpleSlider>
    );

    const dots = screen.queryAllByRole('listitem');
    expect(dots).toStrictEqual([]);
    const arrows = screen.queryAllByTestId('arrow');
    expect(arrows).toStrictEqual([]);
  });
});
