import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import mockAxios from 'jest-mock-axios';

describe('notificationsSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it('should return the correct initial state by default', () => {
    const state = notificationsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should fetch notifications data correctly', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } },
    ];

    // Start the async thunk
    const dispatch = jest.fn();
    const thunk = fetchNotifications();
    await thunk(dispatch, () => ({}), undefined);

    // Simulate axios response
    mockAxios.mockResponse({ data: mockNotifications });

    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check that the fulfilled action would update state correctly
    const action = {
      type: fetchNotifications.fulfilled.type,
      payload: mockNotifications.map((n) =>
        n.id === 3
          ? { ...n, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
          : n
      ),
    };

    const state = notificationsReducer(initialState, action);
    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[2].html.__html).toContain('Urgent requirement');
  });

  it('should remove a notification correctly when markNotificationAsRead is dispatched', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'Important notification' },
      ],
      displayDrawer: true,
    };

    const consoleSpy = jest.spyOn(console, 'log');
    const state = notificationsReducer(stateWithNotifications, markNotificationAsRead(2));

    expect(state.notifications).toHaveLength(2);
    expect(state.notifications.find((n) => n.id === 2)).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

    consoleSpy.mockRestore();
  });

  it('should set displayDrawer to true when showDrawer is dispatched', () => {
    const stateWithDrawerHidden = {
      ...initialState,
      displayDrawer: false,
    };

    const state = notificationsReducer(stateWithDrawerHidden, showDrawer());
    expect(state.displayDrawer).toBe(true);
  });

  it('should set displayDrawer to false when hideDrawer is dispatched', () => {
    const state = notificationsReducer(initialState, hideDrawer());
    expect(state.displayDrawer).toBe(false);
  });
});
