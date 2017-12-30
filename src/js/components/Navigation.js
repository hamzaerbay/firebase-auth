import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const NavigationAuth = () => (
  <div className="navbar-end">
    <Link className="navbar-item" to={routes.LANDING}>Landing</Link>
    <Link className="navbar-item" to={routes.USERS}>Users</Link>
    <Link className="navbar-item" to={routes.ACCOUNT}>Account</Link>
    <SignOutButton />
  </div>
);
const NavigationNonAuth = () => (
  <div className="navbar-end">
    <Link className="navbar-item" to={routes.LANDING}>Landing</Link>
    <Link className="navbar-item" to={routes.SIGN_IN}>Sign In</Link>
  </div>
);

const Navigation = ({ sessionStore }) => (
  <nav className="navbar has-shadow" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to={routes.LANDING}>
        <strong>Firebase Auth</strong>
      </Link>
    </div>
    <div className="navbar-menu" id="navMenu">
      { sessionStore.authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
      }
    </div>
  </nav>
);
export default compose(inject('sessionStore'), observer)(Navigation);
