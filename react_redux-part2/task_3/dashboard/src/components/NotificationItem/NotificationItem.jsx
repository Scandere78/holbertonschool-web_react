import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ id, type = 'default', value, markAsRead }) {
  const color = type === 'urgent' ? 'red' : 'blue';

  const handleClick = () => {
    if (typeof markAsRead === 'function') {
      markAsRead(id);
    }
  };

  return (
    <li
      data-notification-type={type}
      style={{ color }}
      onClick={handleClick}
      className="cursor-pointer hover:opacity-75"
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  markAsRead: PropTypes.func,
};

export default NotificationItem;
