import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  footer: {
    borderTop: '3px solid #e0354b',
    padding: '10px',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const year = new Date().getFullYear();

  return (
    <footer className={css(styles.footer)}>
      <p>Copyright {year} - Holberton School</p>
      {isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </footer>
  );
}
