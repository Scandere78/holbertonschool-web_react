import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component - entry point tests', () => {
  test('renders the App component correctly', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('calls logOut function when Ctrl+h is pressed', () => {
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} />);

    // Simulate Ctrl+h keypress
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(logOutMock).toHaveBeenCalledTimes(1);
  });

  test('calls alert with "Logging you out" when Ctrl+h is pressed', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);

    // Simulate Ctrl+h keypress
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');

    // Restore alert function
    alertSpy.mockRestore();
  });
});