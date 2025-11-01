import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>Hello from Mock App Component</h1>
    );
  }
}

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe('WithLogging HOC', () => {
  test('renders a heading element with correct text', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { getByRole } = render(<WrappedComponent />);

    const heading = getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Hello from Mock App Component');
  });

  test('logs mount and unmount messages with component name', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const WrappedComponent = WithLogging(MockApp);

    const { unmount } = render(<WrappedComponent />);

    expect(spy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();

    expect(spy).toHaveBeenCalledWith('Component MockApp is going to unmount');

    spy.mockRestore();
  });

  test('uses "Component" as default name when wrapped component has no name', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const AnonymousComponent = () => <div>Anonymous</div>;
    Object.defineProperty(AnonymousComponent, 'name', { value: '' });

    const WrappedComponent = WithLogging(AnonymousComponent);
    const { unmount } = render(<WrappedComponent />);

    expect(spy).toHaveBeenCalledWith('Component Component is mounted');

    unmount();

    spy.mockRestore();
  });
});
