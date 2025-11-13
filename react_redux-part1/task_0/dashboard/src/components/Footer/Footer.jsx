import React from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const year = new Date().getFullYear();

  return (
    <footer className="App-footer border-t-[3px] border-[var(--main-color)] py-2 text-center italic">
      <p>Copyright {year} - Holberton School</p>
      {isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </footer>
  );
}
