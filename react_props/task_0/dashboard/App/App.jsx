import React from "react";
import './App.css';
import Header from '../src/Header/Header';
import Footer from '../src/Footer/Footer';
import Login from '../src/Login/Login';


function App() {

  return (
    <div>
      <Header/>

      <Login />

      <Footer/>

    </div>
  );
}

export default App;