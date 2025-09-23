import React from "react";
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="App-footer">
        <p>Copyright {currentYear} - holberton School</p>
      </div>
    </>
  );
}

export default Footer;