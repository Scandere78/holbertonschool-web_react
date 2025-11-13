import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import authReducer from '../../features/auth/authSlice';

const mockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

describe('Footer component - Redux integration', () => {
  test('renders copyright with current year', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    const year = new Date().getFullYear().toString();
    const p = screen.getByText(/copyright/i);
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(year);
  });

  test('does not display "Contact us" when user is logged out', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('displays "Contact us" when user is logged in', () => {
    const store = mockStore({
      auth: { user: { email: 'test@example.com', password: 'password' }, isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });

  test('renders footer element', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
