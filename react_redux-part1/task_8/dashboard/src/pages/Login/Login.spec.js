import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import authReducer from '../../features/auth/authSlice';

const mockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    },
  });
};

describe('Login - Redux integration', () => {
  test('renders the prompt text', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders email and password fields with labels', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('submit button is disabled by default', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const submit = screen.getByRole('button', { name: /ok/i });
    expect(submit).toBeDisabled();
  });

  test('button becomes enabled only when email is valid and password has at least 8 chars', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const pwdInput = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    // 1) Invalid email + short password -> disabled
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.change(pwdInput, { target: { value: '123' } });
    expect(submit).toBeDisabled();

    // 2) Valid email + short password -> disabled
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(pwdInput, { target: { value: 'short' } });
    expect(submit).toBeDisabled();

    // 3) Valid email + password >= 8 -> enabled
    fireEvent.change(pwdInput, { target: { value: 'longpass' } }); // 8 chars
    expect(submit).toBeEnabled();
  });

  test('should not accept invalid email formats', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const pwdInput = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(pwdInput, { target: { value: 'longpassword' } });

    const invalidEmails = [
      'user@.com',
      'user@domain',
      'user@domain..com',
      'user@@domain.com',
      'user@-domain.com',
      'user@domain-.com',
      'user@domain.c',
      'user@domain,com',
    ];

    for (const email of invalidEmails) {
      fireEvent.change(emailInput, { target: { value: email } });
      expect(submit).toBeDisabled();
    }
  });

  test('dispatches login action when form is valid and submitted', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const pwdInput = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(pwdInput, { target: { value: 'longpass' } }); // >= 8
    expect(submit).toBeEnabled();

    fireEvent.click(submit);

    const state = store.getState();
    expect(state.auth.isLoggedIn).toBe(true);
    expect(state.auth.user.email).toBe('user@test.com');
  });

  test('submitting the form does not reload the page', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const pwdInput = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(pwdInput, { target: { value: 'longpass' } });
    expect(submit).toBeEnabled();

    fireEvent.click(submit);
  });
});
