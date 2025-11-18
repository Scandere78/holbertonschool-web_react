import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer from '../../features/auth/authSlice';

const mockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

describe('Header', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('renders the logo', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });
});

describe('Header - Redux integration', () => {
  test('does NOT render logoutSection when user is not logged in', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).toBeNull();
  });

  test('renders logoutSection when user is logged in', () => {
    const store = mockStore({
      auth: { user: { email: 'test@holberton.io', password: 'password' }, isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const section = document.querySelector('#logoutSection');
    expect(section).not.toBeNull();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText('test@holberton.io')).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('clicking on logout dispatches logout action', () => {
    const store = mockStore({
      auth: { user: { email: 'test@holberton.io', password: 'password' }, isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const link = screen.getByText(/logout/i);
    fireEvent.click(link);

    const state = store.getState();
    expect(state.auth.isLoggedIn).toBe(false);
    expect(state.auth.user.email).toBe('');
  });
});
