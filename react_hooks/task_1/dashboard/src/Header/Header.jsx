import React, { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../Context/context';

function Header() {
  const { user, logOut } = useContext(AppContext);

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

export default Header;
