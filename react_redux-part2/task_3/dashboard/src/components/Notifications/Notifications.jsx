import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import closeIcon from '../../assets/close-button.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import {
  fetchNotifications,
  markNotificationAsRead as markAsRead,
} from '../../features/notifications/notificationsSlice';
import { getFilteredNotifications } from '../../features/selectors/notificationsSelector';
import './Notifications.css';

export default function Notifications() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.notifications.loading);
  const drawerRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  // Use memoized selector for filtered notifications
  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleToggleDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.classList.toggle('visible');
    }
  };

  const handleSetFilterUrgent = () => {
    setCurrentFilter('urgent');
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter('default');
  };

  return (
    <div
      className="fixed z-50 text-right"
      style={{ position: 'fixed', top: '1rem', right: '1rem', left: 'auto' }}
    >
      <div
        className="menuItem text-right font-normal text-base text-black"
        data-testid="notifications-title"
        role="button"
        tabIndex={0}
        onClick={handleToggleDrawer}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleToggleDrawer();
        }}
      >
        Your notifications
      </div>

      <div
        ref={drawerRef}
        className="notifications-drawer relative mt-1 inline-block p-2 border border-dotted rounded-none bg-white w-[520px] text-left"
        style={{ borderColor: 'var(--main-color)' }}
      >
        {loading ? (
          <p className="m-0">Loading notifications...</p>
        ) : filteredNotifications.length === 0 ? (
          <p className="notifications-empty m-0">No new notification for now</p>
        ) : (
          <>
            <p className="text-base mb-2 m-0">Here is the list of notifications</p>

            <div className="mb-2 flex gap-2">
              <button
                onClick={handleSetFilterUrgent}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ‼️
              </button>
              <button
                onClick={handleSetFilterDefault}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                ❓
              </button>
              <button
                onClick={() => setCurrentFilter('all')}
                className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                All
              </button>
            </div>

            <button
              aria-label="Close"
              className="absolute top-2 right-2"
              onClick={handleToggleDrawer}
            >
              <img src={closeIcon} alt="Close" className="w-3 h-3" />
            </button>

            <ul className="notifications-list">
              {filteredNotifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  id={n.id}
                  type={n.type}
                  value={n.value}
                  markAsRead={() => handleMarkAsRead(n.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
