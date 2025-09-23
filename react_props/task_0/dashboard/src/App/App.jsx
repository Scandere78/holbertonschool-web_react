import React, { Fragment } from "react";
import './App.css';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';


function App() {

  return (
    <Fragment>
      <Notifications/>
      <Header/>
      <Login />
      <Footer/>
    </Fragment>
  );
}

export default App;