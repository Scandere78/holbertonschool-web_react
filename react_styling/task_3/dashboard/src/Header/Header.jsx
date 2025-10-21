import React from 'react';

export default function Header() {
  return (
    <header className="App-header flex items-center gap-4 p-4" style={{ borderBottom: '3px solid var(--main-color)' }}>
      <img
        className="App-logo h-48 w-48"
        src="https://www.holbertonschool.com/holberton-logo.png"
        alt="Holberton logo"
      />
      <h1 className="text-4xl font-bold" style={{ color: 'var(--main-color)' }}>School dashboard</h1>
    </header>
  );
}