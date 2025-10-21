import React from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    html: PropTypes.shape({
      __html: PropTypes.string,
    }),
    markAsRead: PropTypes.func,
    id: PropTypes.number,
  };

  static defaultProps = {
    type: 'default',
    markAsRead: () => {},
    id: 0,
  };

  handleClick = () => {
    const { markAsRead, id } = this.props;
    markAsRead(id);
  };

  render() {
    const { type, value, html } = this.props;
    const color = type === 'urgent' ? 'var(--urgent-notification-item)' : 'var(--default-notification-item)';

    if (html) {
      return (
        <li
          data-priority={type}
          dangerouslySetInnerHTML={html}
          onClick={this.handleClick}
          style={{ color }}
        />
      );
    }

    return (
      <li data-priority={type} onClick={this.handleClick} style={{ color }}>
        {value}
      </li>
    );
  }
}

export default NotificationItem;
