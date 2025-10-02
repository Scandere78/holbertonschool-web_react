import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({ listNotifications }) {
  const handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  // Notifications par défaut si aucune liste n'est fournie
  const defaultNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' }
  ];

  const notifications = listNotifications || defaultNotifications;

  return (
    <div className="notification-items">
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
        aria-label="Close"
        onClick={handleCloseClick}
      >
        <img src={closeIcon} alt="close" />
      </button>
      <p>Here is the list of notifications</p>
      
      {notifications.length === 0 ? (
        <ul>
          <NotificationItem 
            type="default" 
            value="No new notification for now" 
          />
        </ul>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              type={notification.type}
              value={notification.value}
              html={notification.html}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
