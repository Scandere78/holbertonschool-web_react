// src/App/App.jsx
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./App.css";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

class App extends React.Component {
  static propTypes = {
    logOut: PropTypes.func,
  };

  static defaultProps = {
    logOut: () => {},
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "h") {
      alert("Logging you out");
      this.props.logOut();
    }
  };

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
