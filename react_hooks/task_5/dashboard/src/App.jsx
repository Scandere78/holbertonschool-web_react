import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './App/App.css';
import AppContext from './Context/context';

import Notifications from './Notifications/Notifications';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import CourseList from './CourseList/CourseList';
import { getLatestNotification } from './utils/utils';

import BodySection from './BodySection/BodySection';
import BodySectionWithMarginBottom from './BodySection/BodySectionWithMarginBottom';

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ]);
  const [courses, setCourses] = useState([
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ]);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Keep default notifications if fetch fails
      }
    };
    fetchNotifications();
  }, []);

  // Fetch courses when user logs in
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses.json');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Keep default courses if fetch fails
      }
    };

    if (user.isLoggedIn) {
      fetchCourses();
    }
  }, [user.isLoggedIn]);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const contextValue = {
    user,
    logOut,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Notifications
        displayDrawer={displayDrawer}
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <div className="App">
        <Header />
        <main className="App-body">
          {!user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={logIn} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={courses} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
