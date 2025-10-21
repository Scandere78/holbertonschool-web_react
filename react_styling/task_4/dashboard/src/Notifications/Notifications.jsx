import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

class Notifications extends React.Component {
  static propTypes = {
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
  };

  static defaultProps = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ],
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications } = this.props;

    return (
      <div
        className="Notifications relative p-4 max-[912px]:fixed max-[912px]:inset-0 max-[912px]:w-full max-[912px]:h-full max-[912px]:bg-white max-[912px]:z-50 max-[912px]:p-0"
        style={{ border: '2px dashed var(--main-color)' }}
      >
        <button
          className="absolute top-2 right-2 bg-transparent border-none cursor-pointer z-10"
          aria-label="Close"
          onClick={this.handleCloseClick}
        >
          <img src={closeIcon} alt="close" />
        </button>
        <p className="text-right font-bold max-[912px]:text-lg max-[912px]:p-4">Your notifications</p>
        <ul className="max-[912px]:list-none max-[912px]:p-0 max-[912px]:m-0">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              type={notification.type}
              value={notification.value}
              html={notification.html}
              markAsRead={this.markAsRead}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Notifications;
