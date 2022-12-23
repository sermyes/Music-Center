import Main from '../main';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Main Component', () => {
  const goToMusic = jest.fn();

  it('renders correctly', () => {
    const component = renderer.create(<Main goToMusic={goToMusic} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('calls goToMusic when button clicked', async () => {
    render(<Main goToMusic={goToMusic} />);

    const button = screen.getByTestId('goToMusic');
    await userEvent.click(button);

    expect(goToMusic).toHaveBeenCalledTimes(1);
  });
});
