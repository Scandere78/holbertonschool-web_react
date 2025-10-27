import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component - Task 1', () => {
  test('submit button is disabled by default', () => {
    render(<Login />);
    const submitButton = screen.getByDisplayValue('OK');
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when email and password are valid', () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue('OK');

    // Initially disabled
    expect(submitButton).toBeDisabled();

    // Enter valid email and password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Should be enabled now
    expect(submitButton).not.toBeDisabled();
  });

  test('submit button remains disabled with invalid email', () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue('OK');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitButton).toBeDisabled();
  });

  test('submit button remains disabled with short password', () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue('OK');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    expect(submitButton).toBeDisabled();
  });

  test('calls logIn prop when form is submitted', () => {
    const logInMock = jest.fn();
    render(<Login logIn={logInMock} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('button', { name: /ok/i }).closest('form');

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(logInMock).toHaveBeenCalledWith('user@test.com', 'password123');
  });
});
