import { useState, useCallback } from 'react';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateForm = useCallback((emailValue, passwordValue) => {
    const isEmailValid = validateEmail(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    return isEmailValid && isPasswordValid;
  }, []);

  const handleChangeEmail = useCallback((event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEnableSubmit(validateForm(newEmail, password));
  }, [password, validateForm]);

  const handleChangePassword = useCallback((event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setEnableSubmit(validateForm(email, newPassword));
  }, [email, validateForm]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (enableSubmit && onLogin) {
      onLogin(email, password);
    }
  }, [email, password, enableSubmit, onLogin]);

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
}

export default useLogin;
