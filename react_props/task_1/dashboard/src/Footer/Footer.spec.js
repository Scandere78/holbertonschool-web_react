import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();

    const p = screen.getByText(/copyright/i);
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(year);
  });

  test('renders text Copyright and the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    
    const copyrightText = screen.getByText(/copyright/i);
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveTextContent('Copyright');
    expect(copyrightText).toHaveTextContent(currentYear.toString());
        // Vérifier le texte complet
    expect(copyrightText).toHaveTextContent(`Copyright ${currentYear} - Holberton School`);
  });
});
