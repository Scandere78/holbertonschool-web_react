import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../../assets/close-button.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../../features/notifications/notificationsSlice';

const styles = StyleSheet.create({
  notifications: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 50,
  },
  menuItem: {
    textAlign: 'right',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  drawer: {
    position: 'relative',
    marginTop: '0.5rem',
    display: 'inline-block',
    padding: '10px',
    border: '2px dotted #e0354b',
    backgroundColor: 'white',
    width: '520px',
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
});

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const displayDrawer = useSelector((state) => state.notifications.displayDrawer);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleDisplayDrawer = () => {
    dispatch(showDrawer());
  };

  const handleHideDrawer = () => {
    dispatch(hideDrawer());
  };

  const shouldBounce = notifications.length > 0 && !displayDrawer;

  return (
    <div className={css(styles.notifications)}>
      <div
        className={css(styles.menuItem)}
        data-testid="notifications-title"
        role="button"
        tabIndex={0}
        onClick={handleDisplayDrawer}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleDisplayDrawer();
        }}
      >
        Your notifications
      </div>

      {displayDrawer && (
        <div className={css(styles.drawer)}>
          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>

              <button
                aria-label="Close"
                className={css(styles.closeButton)}
                onClick={handleHideDrawer}
              >
                <img src={closeIcon} alt="Close" style={{ width: '12px', height: '12px' }} />
              </button>

              <ul>
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
      )}
    </div>
  );
}
