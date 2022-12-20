import Navigation from '../navigation';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { fakePosts } from './../../tests/posts';
import { PostData } from '../../../service/post_respository';

describe('Navigation', () => {
  const moveTo = jest.fn();
  const onActive = jest.fn();
  const updateIndex = jest.fn();

  it('renders correctly', () => {
    const component = renderer.create(
      <Navigation
        onActive={onActive}
        moveTo={moveTo}
        updateIndex={updateIndex}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Check that the correct page index is entered when the button is clicked', async () => {
    render(
      <Navigation
        onActive={onActive}
        moveTo={moveTo}
        updateIndex={updateIndex}
      />
    );

    const item = screen.getAllByRole('listitem');

    await userEvent.click(item[0]);
    expect(moveTo).toHaveBeenCalledWith(0);

    await userEvent.click(item[1]);
    expect(moveTo).toHaveBeenCalledWith(1);

    await userEvent.click(item[2]);
    expect(moveTo).toHaveBeenCalledWith(2);

    await userEvent.click(item[3]);
    expect(moveTo).toHaveBeenCalledWith(3);
  });
});
