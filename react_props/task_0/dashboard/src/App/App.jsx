// src/App/App.jsx
import React, { Fragment } from "react";
import "./App.css";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="root-notifications">
          <Notifications />
        </div>
        <Header />
        <Login />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
