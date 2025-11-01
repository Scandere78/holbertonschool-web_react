import React, { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import AppContext from '../Context/context';

function Footer() {
  const { user } = useContext(AppContext);

  return (
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
  );
}

export default Footer;
