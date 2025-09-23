import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders correct text in footer", () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear();
  expect(
    screen.getByText(
      new RegExp(`Copyright ${currentYear} - holberton School`, "i")
    )
  ).toBeInTheDocument();
});