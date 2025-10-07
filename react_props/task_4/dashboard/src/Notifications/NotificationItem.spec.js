import React from 'react';
import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders with default type - blue color and data-notification-type="default"', () => {
    const { container } = render(<NotificationItem type="default" value="test" />);
    const li = container.querySelector('li');

    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li).toHaveStyle({ color: 'blue' });
  });

  test('renders with urgent type - red color and data-notification-type="urgent"', () => {
    const { container } = render(<NotificationItem type="urgent" value="test" />);
    const li = container.querySelector('li');

    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li).toHaveStyle({ color: 'red' });
  });

  test('renders value prop correctly', () => {
    const { container } = render(<NotificationItem type="default" value="test value" />);
    const li = container.querySelector('li');

    expect(li).toHaveTextContent('test value');
  });

  test('renders html prop correctly', () => {
    const { container } = render(
      <NotificationItem type="urgent" html={{ __html: '<u>test html</u>' }} />
    );
    const li = container.querySelector('li');

    expect(li.innerHTML).toBe('<u>test html</u>');
  });
});
