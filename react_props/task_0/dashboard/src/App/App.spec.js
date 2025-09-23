import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders all components correctly", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: /School dashboard/i })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/Login to access the full dashboard/i)
  ).toBeInTheDocument();

  const currentYear = new Date().getFullYear();
  expect(
    screen.getByText(
      new RegExp(`Copyright ${currentYear} - holberton School`, "i")
    )
  ).toBeInTheDocument();

  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});