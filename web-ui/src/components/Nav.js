'use es6';

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { postLogout } from '../data/session';
import { useNav } from '../hooks/useNav';

const LoggedIn = () => {};
LoggedIn.displayName = '';

const Nav = () => {
  const { name } = useNav();
  return (
    <div className="w-100 d-flex justify-content-between mt-2">
      <Link to="/" className="my-2">
        My events
      </Link>
      {name ? (
        <div className="d-flex flex-column align-items-end">
          Logged in as: {name}
          <Button variant="link" onClick={postLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-end">
          <Link to="/login">Login</Link>
          <Link to="/users/new">Register</Link>
        </div>
      )}
    </div>
  );
};
Nav.displayName = 'Nav';

export default Nav;
