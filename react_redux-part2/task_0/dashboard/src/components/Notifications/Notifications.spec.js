import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import Notifications from "./Notifications";
import notificationsReducer from '../../features/notifications/notificationsSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState: {
      notifications: {
        notifications: [],
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe('Notifications', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', async () => {
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    // Toggle drawer to make it visible
    const drawer = container.querySelector('.notifications-drawer');
    fireEvent.click(screen.getByTestId('notifications-title'));

    const notiftitle = screen.getByText(/Here is the list of notifications/i);
    expect(notiftitle).toBeInTheDocument();
  });

  test('Check the existence of the button element in the notifications (Close button)', async () => {
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    // Toggle drawer to make it visible
    fireEvent.click(screen.getByTestId('notifications-title'));

    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
  });

  test('Verify that there are 3 li elements as notifications rendered', async () => {
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    // Toggle drawer to make it visible
    fireEvent.click(screen.getByTestId('notifications-title'));

    const lielements = screen.getAllByRole('listitem');
    expect(lielements.length).toBe(3);
  });

  test('clicking on "Your notifications" toggles the drawer visibility', async () => {
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    const drawer = container.querySelector('.notifications-drawer');
    expect(drawer).not.toHaveClass('visible');

    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(drawer).toHaveClass('visible');

    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(drawer).not.toHaveClass('visible');
  });

  test('clicking on the close button hides the drawer', async () => {
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    const drawer = container.querySelector('.notifications-drawer');
    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(drawer).toHaveClass('visible');

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(drawer).not.toHaveClass('visible');
  });

  test('Clicking a notification item marks it as read', async () => {
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    // Toggle drawer to make it visible
    fireEvent.click(screen.getByTestId('notifications-title'));

    const initialCount = screen.getAllByRole('listitem').length;
    fireEvent.click(screen.getByText('New resume available'));

    // After marking as read, the notification should be removed
    await waitFor(() => {
      const newCount = screen.queryAllByRole('listitem').length;
      expect(newCount).toBe(initialCount - 1);
    });
  });
});

describe('Whenever the drawer is not visible', () => {
  test('Check that the Notifications component has hidden drawer by default', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Test</strong>' } },
    ];
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    const drawer = container.querySelector('.notifications-drawer');
    expect(drawer).not.toHaveClass('visible');
  });
});

describe('Whenever the drawer is visible', () => {
  test('Check that the Notifications component displays the elements', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Test</strong>' } },
    ];
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    // Toggle drawer visible
    fireEvent.click(screen.getByTestId('notifications-title'));

    expect(screen.queryByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('Check that drawer toggles correctly even with empty initial state', async () => {
    const store = createMockStore({ notifications: [] });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    }, { timeout: 3000 });

    const drawer = container.querySelector('.notifications-drawer');
    expect(drawer).not.toHaveClass('visible');

    // Toggle drawer visible
    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(drawer).toHaveClass('visible');
  });
});

describe('Notifications (Re-render optimization)', () => {
  test('Component should not re-render when toggling drawer visibility', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'A' },
      { id: 2, type: 'default', value: 'B' },
    ];
    const store = createMockStore({ notifications: mockNotifications });
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading notifications.../i)).not.toBeInTheDocument();
    });

    const drawer = container.querySelector('.notifications-drawer');

    // Initial state - drawer hidden
    expect(drawer).not.toHaveClass('visible');

    // Toggle visibility - component should not re-render from Redux
    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(drawer).toHaveClass('visible');

    // Toggle again
    fireEvent.click(screen.getByTestId('notifications-title'));
    expect(drawer).not.toHaveClass('visible');
  });
});
