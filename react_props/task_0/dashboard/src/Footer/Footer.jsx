import React from "react";
import './App.css';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="App-footer">
        <p>Copyright {currentYear} - holberton School</p>
      </div>
    </>
  );
}

export default App;