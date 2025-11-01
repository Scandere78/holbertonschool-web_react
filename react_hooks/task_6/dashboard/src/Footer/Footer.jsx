import React from 'react';
import PropTypes from 'prop-types';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer({ user }) {
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

Footer.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

Footer.defaultProps = {
  user: { isLoggedIn: false },
};

export default Footer;
