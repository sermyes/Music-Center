import BoardItem from '../boardItem';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { fakePosts } from './../../tests/posts';

describe('Board Item', () => {
  const admin = fakePosts.admin!;
  const notice = fakePosts.notice!['1'];
  const question = fakePosts.question!['2'];
  const post = fakePosts.post!['3'];
  post.date = new Date().getTime();
  const onRemove = jest.fn();

  it('renders correctly', () => {
    const component = renderer.create(
      <BoardItem post={post} admin={admin} onRemove={onRemove} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders notice type data', async () => {
    render(<BoardItem notice={notice} admin={admin} onRemove={onRemove} />);
    expect(screen.getByText('Notice')).toBeInTheDocument();
    expect(screen.getByText('notice text')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders question type data', async () => {
    render(<BoardItem post={question} admin={admin} onRemove={onRemove} />);
    expect(screen.getByText('question text')).toBeInTheDocument();
    expect(screen.getByText('작성자')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders post type data', async () => {
    render(<BoardItem post={post} admin={admin} onRemove={onRemove} />);
    expect(screen.getByText('Request')).toBeInTheDocument();
    expect(screen.getByText('post text')).toBeInTheDocument();
    expect(screen.getByText('작성자')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('calls onRemove with post when deleteButton clicked', async () => {
    render(<BoardItem post={question} admin={admin} onRemove={onRemove} />);
    window.prompt = jest.fn().mockImplementation(() => '2');
    const deleteButton = screen.getByText('delete');
    await userEvent.click(deleteButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(question);
  });
});
