import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection component', () => {
  test('renders a heading with the title prop value', () => {
    render(<BodySection title="test title" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('test title');
  });

  test('renders one child paragraph correctly', () => {
    render(
      <BodySection title="test title">
        <p>test child paragraph</p>
      </BodySection>
    );
    expect(screen.getByText('test child paragraph')).toBeInTheDocument();
  });

  test('renders multiple children correctly', () => {
    render(
      <BodySection title="test title">
        <p>first child</p>
        <p>second child</p>
      </BodySection>
    );
    expect(screen.getByText('first child')).toBeInTheDocument();
    expect(screen.getByText('second child')).toBeInTheDocument();
  });
});
