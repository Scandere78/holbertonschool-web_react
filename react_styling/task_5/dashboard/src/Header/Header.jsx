import React from 'react';

export default function Header() {
  return (
    <header className="App-header flex items-center gap-4 p-4 max-[520px]:flex-col max-[520px]:text-center" style={{ borderBottom: '3px solid var(--main-color)' }}>
      <img
        className="App-logo h-48 w-48 max-[520px]:h-32 max-[520px]:w-32"
        src="https://www.holbertonschool.com/holberton-logo.png"
        alt="Holberton logo"
      />
      <h1 className="text-4xl font-bold max-[520px]:text-2xl" style={{ color: 'var(--main-color)' }}>School dashboard</h1>
    </header>
  );
}