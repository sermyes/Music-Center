import Board from '../board';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { fakePosts } from './../../tests/posts';
import { PostData } from '../../../service/post_respository';

describe('Board', () => {
  const onConfirm = jest.fn();
  const onRemove = jest.fn();
  const posts: PostData[] | [] = [];
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

  it('visible the delete button when elipsis clicked', async () => {
    render(
      <Board
        onConfirm={onConfirm}
        onRemove={onRemove}
        posts={posts}
        notices={notices}
        admin={admin}
      />
    );
    const elipsis = screen.getByTestId('elipsis');
    await userEvent.click(elipsis);
    expect(screen.getByText('delete')).toBeInTheDocument();
  });
});
