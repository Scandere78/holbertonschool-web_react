import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("renders correct text in body", () => {
  render(<Login />);
  expect(
    screen.getByText(/Login to access the full dashboard/i)
  ).toBeInTheDocument();
});

test("renders 2 input tags and 2 label tags", () => {
  render(<Login />);
  
  // Vérifier que les labels sont rendus
  const emailLabel = screen.getByLabelText(/email/i);
  expect(emailLabel).toBeInTheDocument();
  
  const passwordLabel = screen.getByLabelText(/password/i);
  expect(passwordLabel).toBeInTheDocument();
  
  // Vérifier que les inputs sont rendus
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  expect(emailInput).toBeInTheDocument();
  expect(emailInput.type).toBe('email');
  
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput.type).toBe('password');
  
  // Vérifier que le bouton est rendu
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
  expect(button.type).toBe('submit');
});