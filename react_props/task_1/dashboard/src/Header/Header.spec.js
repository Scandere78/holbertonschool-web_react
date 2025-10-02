import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders heading with text 'School dashboard'", () => {
  render(<Header />);
  expect(
    screen.getByRole("heading", { level: 1, name: /School dashboard/i })
  ).toBeInTheDocument();
});

test("renders img and h1 tags", () => {
  render(<Header />);
  
  // Vérifier que le logo est rendu
  const logo = screen.getByAltText('holberton logo');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('src');
  
  // Vérifier que le titre h1 est rendu avec le bon texte
  const title = screen.getByRole('heading', { level: 1 });
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('School dashboard');
});

test("renders the Holberton logo", () => {
  render(<Header />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});