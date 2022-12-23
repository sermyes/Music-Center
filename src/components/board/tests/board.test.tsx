import Board from '../board';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { fakePosts } from './../../tests/posts';

describe('Board', () => {
  const onConfirm = jest.fn();
  const onRemove = jest.fn();
  const posts = [fakePosts.post!['3']];
  const notices = [fakePosts.notice!['1']];
  const admin = fakePosts.admin!;

  it('renders correctly', () => {
    const component = renderer.create(
      <Board
        onConfirm={onConfirm}
        onRemove={onRemove}
        posts={posts}
        notices={notices}
        admin={admin}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('visible/invisible the delete button when elipsis clicked', async () => {
    render(
      <Board
        onConfirm={onConfirm}
        onRemove={onRemove}
        posts={posts}
        notices={notices}
        admin={admin}
      />
    );
    const elipsis = screen.getAllByTestId('elipsis');
    await userEvent.click(elipsis[0]);
    expect(elipsis[0]).toHaveClass('active');

    await userEvent.click(elipsis[0]);
    expect(elipsis[0]).not.toHaveClass('active');
  });
});
