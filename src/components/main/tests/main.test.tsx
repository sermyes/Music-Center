import Main from '../main';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('Main Component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Main />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
