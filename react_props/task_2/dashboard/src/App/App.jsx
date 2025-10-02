import React, { Fragment } from 'react';
import './App.css';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { getLatestNotification } from '../utils/utils';

function App() {
  // Tableau de notifications à passer au composant Notifications
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: getLatestNotification() }
  ];

  return (
    <Fragment>
      <div className="root-notifications">
        <Notifications listNotifications={listNotifications} />
      </div>
      <Header />
      <Login />
      <Footer />
    </Fragment>
  );
}

export default App;