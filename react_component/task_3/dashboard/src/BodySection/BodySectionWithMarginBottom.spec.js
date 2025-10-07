import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom component', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test child</p>
      </BodySectionWithMarginBottom>
    );
    const div = container.querySelector('.bodySectionWithMargin');
    expect(div).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test child</p>
      </BodySectionWithMarginBottom>
    );
    const bodySection = container.querySelector('.bodySection');
    expect(bodySection).toBeInTheDocument();
  });

  test('renders title and children correctly', () => {
    render(
      <BodySectionWithMarginBottom title="test title">
        <p>test child</p>
      </BodySectionWithMarginBottom>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('test title');
    expect(screen.getByText('test child')).toBeInTheDocument();
  });
});
