import { createSelector } from '@reduxjs/toolkit';

// Base selector to get notifications from state
const selectNotifications = (state) => state.notifications.notifications;

// Memoized selector to filter notifications
export const getFilteredNotifications = createSelector(
  [selectNotifications, (state, filter) => filter],
  (notifications, filter) => {
    if (filter === 'all') {
      return notifications;
    }
    return notifications.filter((notification) => notification.type === filter);
  }
);
