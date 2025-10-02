import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("renders correct text in body", () => {
  render(<Login />);
  expect(
    screen.getByText(/Login to access the full dashboard/i)
  ).toBeInTheDocument();
});