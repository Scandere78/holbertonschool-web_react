import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../../assets/holberton-logo.jpg';
import { logout } from '../../features/auth/authSlice';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '3px solid #e0354b',
  },
  logo: {
    height: '200px',
    marginRight: '20px',
  },
  title: {
    color: '#e0354b',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  logoutSection: {
    fontSize: '0.9rem',
    marginLeft: '20px',
  },
});

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header className={css(styles.header)}>
      <img
        className={css(styles.logo)}
        src={holbertonLogo}
        alt="Holberton logo"
      />
      <h1 className={css(styles.title)}>School Dashboard</h1>

      {isLoggedIn && (
        <div id="logoutSection" data-testid="logoutSection" className={css(styles.logoutSection)}>
          <span>
            Welcome <strong>{user.email}</strong>{' '}
          </span>
          <a href="#logout" onClick={handleLogout}>
            (logout)
          </a>
        </div>
      )}
    </header>
  );
}
