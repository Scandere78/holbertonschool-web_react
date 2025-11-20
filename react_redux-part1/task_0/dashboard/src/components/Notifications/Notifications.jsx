import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/close-button.png';
import NotificationItem from '../NotificationItem/NotificationItem';

export default function Notifications({
  notifications = [],
  displayDrawer = false,
  handleDisplayDrawer,
  handleHideDrawer,
  markNotificationAsRead,
}) {
  const shouldBounce = notifications.length > 0 && !displayDrawer;

  return (
    <div
      className="fixed z-50 text-right"
      style={{ position: 'fixed', top: '1rem', right: '1rem', left: 'auto' }}
    >
      <div
        className={`menuItem text-right font-normal text-base text-black ${shouldBounce ? 'animate-bounce' : ''}`}
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
        <div
          className="relative mt-1 inline-block p-2 border border-dotted rounded-none bg-white w-[520px] text-left"
          style={{ borderColor: 'var(--main-color)' }}
        >
          {notifications.length === 0 ? (
            <p className="notifications-empty m-0">No new notification for now</p>
          ) : (
            <>
              <p className="text-base mb-2 m-0">Here is the list of notifications</p>

              <button
                aria-label="Close"
                className="absolute top-2 right-2"
                onClick={handleHideDrawer}
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
                    markAsRead={() => markNotificationAsRead(n.id)}
                    markNotificationAsRead={markNotificationAsRead}
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

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};
