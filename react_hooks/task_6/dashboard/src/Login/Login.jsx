import React from "react";
import PropTypes from "prop-types";
import useLogin from "../hooks/useLogin";

function Login({ logIn }) {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLogin(logIn);

  return (
    <div className="App-body">
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleSubmit}>
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
