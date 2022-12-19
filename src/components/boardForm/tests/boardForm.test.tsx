import BoardForm from '../boardForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { fakePosts } from './../../tests/posts';
jest.mock('uuid', () => {
  return {
    v4: () => '0'
  };
});

describe('Board Item', () => {
  const admin = fakePosts.admin!;
  const onConfirm = jest.fn();
  let option: HTMLSelectElement;
  let id: HTMLInputElement;
  let psw: HTMLInputElement;
  let content: HTMLTextAreaElement;
  let button: HTMLButtonElement;
  window.alert = jest.fn();
  it('renders correctly', () => {
    const component = renderer.create(
      <BoardForm onConfirm={onConfirm} admin={admin} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  beforeEach(() => {
    render(<BoardForm onConfirm={onConfirm} admin={admin} />);
    option = screen.getByTestId('option');
    id = screen.getByTestId('id');
    psw = screen.getByTestId('psw');
    content = screen.getByTestId('content');
    button = screen.getByRole('button');
  });

  describe('enter notice with admin', () => {
    it('if you have administrator rights', async () => {
      await userEvent.selectOptions(option, ['notice']);
      await userEvent.type(id, 'admin');
      await userEvent.type(psw, '123');
      await userEvent.type(content, 'content');
      await userEvent.click(button);

      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onConfirm.mock.calls[0][1]).toBe('0');
      expect(onConfirm.mock.calls[0][0]['0']['name']).toBe('admin');
      expect(onConfirm.mock.calls[0][0]['0']['psw']).toBe('123');
      expect(onConfirm.mock.calls[0][0]['0']['content']).toBe('content');
      expect(onConfirm.mock.calls[0][0]['0']['type']).toBe('notice');
    });

    it('if you do not have administrator rights', async () => {
      await userEvent.selectOptions(option, ['notice']);
      await userEvent.type(id, 'admin');
      await userEvent.type(psw, '1');
      await userEvent.type(content, 'content');
      await userEvent.click(button);

      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it('if author could not be entered', async () => {
      await userEvent.selectOptions(option, ['notice']);
      await userEvent.type(psw, '123');
      await userEvent.type(content, 'content');
      await userEvent.click(button);

      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it('if password could not be entered', async () => {
      await userEvent.selectOptions(option, ['notice']);
      await userEvent.type(id, 'admin');
      await userEvent.type(content, 'content');
      await userEvent.click(button);

      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it('if content could not be entered', async () => {
      await userEvent.selectOptions(option, ['notice']);
      await userEvent.type(id, 'admin');
      await userEvent.type(psw, '123');
      await userEvent.click(button);

      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  it('enter question data', async () => {
    await userEvent.selectOptions(option, ['post']);
    await userEvent.type(id, 'user');
    await userEvent.type(psw, '1');
    await userEvent.type(content, 'content');
    await userEvent.click(button);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm.mock.calls[0][1]).toBe('0');
    expect(onConfirm.mock.calls[0][0]['0']['name']).toBe('user');
    expect(onConfirm.mock.calls[0][0]['0']['psw']).toBe('1');
    expect(onConfirm.mock.calls[0][0]['0']['content']).toBe('content');
    expect(onConfirm.mock.calls[0][0]['0']['type']).toBe('post');
  });

  it('enter question data', async () => {
    await userEvent.selectOptions(option, ['question']);
    await userEvent.type(id, 'user');
    await userEvent.type(psw, '1');
    await userEvent.type(content, 'content');
    await userEvent.click(button);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm.mock.calls[0][1]).toBe('0');
    expect(onConfirm.mock.calls[0][0]['0']['name']).toBe('user');
    expect(onConfirm.mock.calls[0][0]['0']['psw']).toBe('1');
    expect(onConfirm.mock.calls[0][0]['0']['content']).toBe('content');
    expect(onConfirm.mock.calls[0][0]['0']['type']).toBe('question');
  });
});
