import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Modal from '../modal';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  const Child = () => <div>modal</div>;
  const onClose = jest.fn();

  it('renders correctly', () => {
    const component = renderer.create(
      <Modal onClose={onClose}>
        <Child />
      </Modal>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders modal', async () => {
    render(
      <Modal onClose={onClose}>
        <Child />
      </Modal>
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(screen.getByText('modal')).toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
