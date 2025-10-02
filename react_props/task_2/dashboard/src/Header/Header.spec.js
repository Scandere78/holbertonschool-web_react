import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders heading with text 'School dashboard'", () => {
  render(<Header />);
  expect(
    screen.getByRole("heading", { level: 1, name: /School dashboard/i })
  ).toBeInTheDocument();
});

test("renders the Holberton logo", () => {
  render(<Header />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});