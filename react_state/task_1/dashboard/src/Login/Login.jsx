import React, { Component } from "react";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email || "",
      password: props.password || "",
      enableSubmit: false
    };
  }

  static propTypes = {
    logIn: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
  };

  static defaultProps = {
    logIn: () => {},
    email: "",
    password: "",
  };

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm() {
    const { email, password } = this.state;
    const isEmailValid = this.validateEmail(email);
    const isPasswordValid = password.length >= 8;
    return isEmailValid && isPasswordValid;
  }

  handleChangeEmail = (event) => {
    const email = event.target.value;
    this.setState({ email }, () => {
      this.setState({ enableSubmit: this.validateForm() });
    });
  }

  handleChangePassword = (event) => {
    const password = event.target.value;
    this.setState({ password }, () => {
      this.setState({ enableSubmit: this.validateForm() });
    });
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
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
}

export default Login;
