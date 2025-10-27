import React, { Component } from 'react';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../Context/context';

class Header extends Component {
  static contextType = AppContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <header className="App-header">
        <img src={logo} alt="Holberton Logo" />
        <h1>School dashboard</h1>
        {user.isLoggedIn && (
          <section id="logoutSection" className="logout-section">
            Welcome {user.email} (<a href="#" onClick={(e) => { e.preventDefault(); logOut(); }}>logout</a>)
          </section>
        )}
      </header>
    );
  }
}

export default Header;
