import React, { memo } from 'react';
import PropTypes from 'prop-types';

const NotificationItem = memo(function NotificationItem({ type, value, html, markAsRead, id }) {
  const handleClick = () => {
    markAsRead(id);
  };

  if (html) {
    return (
      <li
        data-priority={type}
        dangerouslySetInnerHTML={html}
        onClick={handleClick}
      />
    );
  }

  return (
    <li data-priority={type} onClick={handleClick}>
      {value}
    </li>
  );
});

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
  id: 0,
};

export default NotificationItem;
