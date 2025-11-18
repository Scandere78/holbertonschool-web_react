import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from "./Notifications";
import { getLatestNotification } from "../../utils/utils.js";
import notificationsReducer from '../../features/notifications/notificationsSlice';

const mockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState: initialState,
  });
};

describe('Notifications - Redux integration', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', () => {
    const store = mockStore({
      notifications: { notifications: mockNotifications, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notiftitle = screen.getByText(/Here is the list of notifications/i);
    expect(notiftitle).toBeInTheDocument();
  });

  test('Check the existence of the button element in the notifications (Close button)', () => {
    const store = mockStore({
      notifications: { notifications: mockNotifications, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
  });

  test('Verify that there are 3 li elements as notifications rendered', () => {
    const store = mockStore({
      notifications: { notifications: mockNotifications, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const lielements = screen.getAllByRole('listitem');
    expect(lielements.length).toBe(3);
  });

  test('clicking on "Your notifications" dispatches showDrawer action', () => {
    const store = mockStore({
      notifications: { notifications: mockNotifications, displayDrawer: false },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('notifications-title'));

    const state = store.getState();
    expect(state.notifications.displayDrawer).toBe(true);
  });

  test('clicking on the close button dispatches hideDrawer action', () => {
    const store = mockStore({
      notifications: { notifications: mockNotifications, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    const state = store.getState();
    expect(state.notifications.displayDrawer).toBe(false);
  });

  test('Clicking a notification item dispatches markNotificationAsRead action', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const store = mockStore({
      notifications: { notifications: mockNotifications, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByText('New resume available'));

    expect(logSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

    const state = store.getState();
    expect(state.notifications.notifications).toHaveLength(2); // one removed

    logSpy.mockRestore();
  });
});

describe('Whenever displayDrawer is false', () => {
  test('Check that the Notifications component doesn t displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    const store = mockStore({
      notifications: { notifications, displayDrawer: false },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });
});

describe('Whenever displayDrawer is true', () => {
  test('Check that the Notifications component displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    const store = mockStore({
      notifications: { notifications, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.queryByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('Check that the Notifications component displays empty message', () => {
    const store = mockStore({
      notifications: { notifications: [], displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.queryByText("No new notification for now")).toBeInTheDocument();
  });
});

describe('Notifications re-rendering', () => {
  test("re-renders when notifications change", () => {
    const initial = [
      { id: 1, type: 'default', value: 'A' },
      { id: 2, type: 'default', value: 'B' },
    ];

    const store = mockStore({
      notifications: { notifications: initial, displayDrawer: true },
    });

    const { rerender } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('re-renders when notifications length changes', () => {
    const initial = [
      { id: 1, type: 'default', value: 'A' },
      { id: 2, type: 'default', value: 'B' },
    ];

    const store = mockStore({
      notifications: { notifications: initial, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});

describe('Notifications marking as read', () => {
  test('clicking on a notification logs the expected string', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const notifs = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    const store = mockStore({
      notifications: { notifications: notifs, displayDrawer: true },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByText('New course available'));

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    logSpy.mockRestore();
  });
});
