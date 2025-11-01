import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders without crashing', () => {
    render(<NotificationItem type="default" value="test" />);
  });

  test('renders correct type and value', () => {
    const { container } = render(<NotificationItem type="default" value="test" />);
    const li = container.querySelector('li');
    expect(li).toHaveAttribute('data-priority', 'default');
    expect(li).toHaveTextContent('test');
  });

  test('renders html prop correctly', () => {
    const { container } = render(
      <NotificationItem type="urgent" html={{ __html: '<u>test</u>' }} />
    );
    const li = container.querySelector('li');
    expect(li).toHaveAttribute('data-priority', 'urgent');
    expect(li.innerHTML).toBe('<u>test</u>');
  });

  test('calls markAsRead with correct id when clicked', () => {
    const markAsReadMock = jest.fn();
    const { container } = render(
      <NotificationItem type="default" value="test" id={1} markAsRead={markAsReadMock} />
    );
    const li = container.querySelector('li');
    fireEvent.click(li);
    expect(markAsReadMock).toHaveBeenCalledWith(1);
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
  });
});
