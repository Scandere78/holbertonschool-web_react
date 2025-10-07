import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

class Notifications extends React.Component {
  handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    return (
      <div className="Notifications">
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
          onClick={this.handleCloseClick}
        >
          <img src={closeIcon} alt="close" />
        </button>
        <p>Here is the list of notifications</p>
        <ul>
          <NotificationItem type="default" value="New course available" id={1} markAsRead={this.markAsRead} />
          <NotificationItem type="urgent" value="New resume available" id={2} markAsRead={this.markAsRead} />
          <NotificationItem type="urgent" html={{ __html: getLatestNotification() }} id={3} markAsRead={this.markAsRead} />
        </ul>
      </div>
    );
  }
}

export default Notifications;
