import React from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import AppContext from '../Context/context';

function Footer() {
  return (
    <AppContext.Consumer>
      {({ user }) => (
        <footer className="App-footer">
          <p>
            Copyright {getCurrentYear()} - {getFooterCopy(true)}
          </p>
          {user.isLoggedIn && (
            <p>
              <a href="#">Contact us</a>
            </p>
          )}
        </footer>
      )}
    </AppContext.Consumer>
  );
}

export default Footer;
