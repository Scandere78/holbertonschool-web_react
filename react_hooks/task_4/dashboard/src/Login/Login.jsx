import React, { useState } from "react";
import PropTypes from "prop-types";

function Login({ logIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (emailValue, passwordValue) => {
    const isEmailValid = validateEmail(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    return isEmailValid && isPasswordValid;
  };

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEnableSubmit(validateForm(newEmail, password));
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setEnableSubmit(validateForm(email, newPassword));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(email, password);
  };

  return (
    <div className="App-body">
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
        />
      </form>
    </div>
  );
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

export default Login;
