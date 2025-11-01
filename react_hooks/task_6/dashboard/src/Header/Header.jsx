import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/holberton-logo.jpg';

function Header({ user, logOut }) {
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

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
  logOut: PropTypes.func,
};

Header.defaultProps = {
  user: { email: '', isLoggedIn: false },
  logOut: () => {},
};

export default Header;
