import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import closeIcon from '../../assets/close-button.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import {
  fetchNotifications,
  markNotificationAsRead as markAsRead,
} from '../../features/notifications/notificationsSlice';
import './Notifications.css';

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const loading = useSelector((state) => state.notifications.loading);
  const drawerRef = useRef(null);

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
        ) : notifications.length === 0 ? (
          <p className="notifications-empty m-0">No new notification for now</p>
        ) : (
          <>
            <p className="text-base mb-2 m-0">Here is the list of notifications</p>

            <button
              aria-label="Close"
              className="absolute top-2 right-2"
              onClick={handleToggleDrawer}
            >
              <img src={closeIcon} alt="Close" className="w-3 h-3" />
            </button>

            <ul className="notifications-list">
              {notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  id={n.id}
                  type={n.type}
                  value={n.value}
                  html={n.html}
                  markAsRead={() => handleMarkAsRead(n.id)}
                  markNotificationAsRead={handleMarkAsRead}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
