import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import authReducer from './features/auth/authSlice';
import notificationsReducer from './features/notifications/notificationsSlice';
import coursesReducer from './features/courses/coursesSlice';

const mockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      notifications: notificationsReducer,
      courses: coursesReducer,
    },
    preloadedState: initialState,
  });
};

describe('App Component', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: false },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Holberton School news goes here/i)).toBeInTheDocument();
  });

  test('renders Login component when not logged in', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: false },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList component when logged in', () => {
    const store = mockStore({
      auth: { user: { email: 'test@example.com', password: 'password' }, isLoggedIn: true },
      notifications: { notifications: [], displayDrawer: false },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
  });

  test('renders Header component', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: false },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: false },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('renders Notifications component', () => {
    const store = mockStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: false },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('notifications-title')).toBeInTheDocument();
  });
});
