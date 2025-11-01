import React, { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import './App/App.css';

import Notifications from './Notifications/Notifications';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import CourseList from './CourseList/CourseList';
import { getLatestNotification } from './utils/utils';

import BodySection from './BodySection/BodySection';
import BodySectionWithMarginBottom from './BodySection/BodySectionWithMarginBottom';

import { appReducer, initialState, APP_ACTIONS } from './reducers/appReducer';

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ],
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ],
  });

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: { notifications: response.data }
        });
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
        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: { courses: response.data }
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Keep default courses if fetch fails
      }
    };

    if (state.user.isLoggedIn) {
      fetchCourses();
    }
  }, [state.user.isLoggedIn]);

  const logIn = useCallback((email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password }
    });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    if (!state.displayDrawer) {
      dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
    }
  }, [state.displayDrawer]);

  const handleHideDrawer = useCallback(() => {
    if (state.displayDrawer) {
      dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
    }
  }, [state.displayDrawer]);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({
      type: APP_ACTIONS.MARK_NOTIFICATION_READ,
      payload: { id }
    });
  }, []);

  return (
    <>
      <Notifications
        displayDrawer={state.displayDrawer}
        notifications={state.notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <div className="App">
        <Header user={state.user} logOut={logOut} />
        <main className="App-body">
          {!state.user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={logIn} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={state.courses} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </main>
        <Footer user={state.user} />
      </div>
    </>
  );
}

export default App;
