import Portal from '../portal';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
jest.mock('react-dom', () => {
  return {
    createPortal: (node: React.ReactNode) => node
  };
});

describe('Navigation', () => {
  function Component() {
    return (
      <Portal elementId='modal-root'>
        <div>portal</div>
      </Portal>
    );
  }

  it('renders correctly', () => {
    const component = renderer.create(Component());
    expect(component.toJSON()).toMatchSnapshot();
  });
});
