import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App/App.css';

import Notifications from './Notifications/Notifications';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import CourseList from './CourseList/CourseList';
import { getLatestNotification } from './utils/utils';

import BodySection from './BodySection/BodySection';
import BodySectionWithMarginBottom from './BodySection/BodySectionWithMarginBottom';

const defaultNotifications = [];

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    logOut: PropTypes.func,
  };

  static defaultProps = {
    isLoggedIn: true,
    logOut: () => {},
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        <Notifications displayDrawer={true} notifications={defaultNotifications} />
        <div className="App">
          <Header />
          <main className="App-body">
            {!isLoggedIn ? (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={listCourses} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Holberton School News goes here</p>
            </BodySection>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
