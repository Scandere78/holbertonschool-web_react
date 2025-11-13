import { useState } from 'react';

export function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const isValidEmail = (email) => {
    if (email !== email.trim()) return false;
    if (/\s/.test(email)) return false;

    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!pattern.test(email)) return false;

    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const domain = parts[1];

    if (domain.includes('..')) return false;
    if (
      domain.startsWith('.') ||
      domain.endsWith('.') ||
      domain.startsWith('-') ||
      domain.endsWith('-')
    ) {
      return false;
    }

    const labels = domain.split('.');
    if (labels.some((label) => label.length === 0 || label.startsWith('-') || label.endsWith('-'))) {
      return false;
    }

    return true;
  };

  const computeEnableSubmit = (email, password) => {
    const e = email;
    const p = password.trim();
    const hasOuterSpaces = e !== e.trim();

    return (
      !hasOuterSpaces &&
      e.length > 0 &&
      isValidEmail(e) &&
      p.length >= 8
    );
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEnableSubmit(computeEnableSubmit(newEmail, password));
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setEnableSubmit(computeEnableSubmit(email, newPassword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enableSubmit && onLogin) {
      onLogin({ email, password });
    }
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
}
