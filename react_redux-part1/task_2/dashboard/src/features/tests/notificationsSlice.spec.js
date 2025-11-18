import notificationsReducer, {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  test('should return the initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle showDrawer action', () => {
    const state = { ...initialState, displayDrawer: false };
    const actual = notificationsReducer(state, showDrawer());
    expect(actual.displayDrawer).toBe(true);
  });

  test('should handle hideDrawer action', () => {
    const state = { ...initialState, displayDrawer: true };
    const actual = notificationsReducer(state, hideDrawer());
    expect(actual.displayDrawer).toBe(false);
  });

  test('should handle markNotificationAsRead action', () => {
    const state = {
      ...initialState,
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    };
    
    const actual = notificationsReducer(state, markNotificationAsRead(1));
    
    expect(actual.notifications).toHaveLength(1);
    expect(actual.notifications[0].id).toBe(2);
  });

  test('should handle fetchNotifications.fulfilled', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent</strong>' } },
    ];

    axios.get.mockResolvedValue({
      data: { notifications: mockNotifications },
    });

    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    await store.dispatch(fetchNotifications());
    const state = store.getState().notifications;

    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[0].id).toBe(1);
  });
});
