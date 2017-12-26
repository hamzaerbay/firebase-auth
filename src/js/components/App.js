import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignupPage from './SignUp';
import SigninPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import UsersPage from './Users';
import AccountPage from './Account';
import withAuthentication from './withAuthentication';

import * as routes from '../constants/routes';

const App = authUser => (
  <Router>
    <div>
      <Navigation authUser={authUser} />
      <div className="container">
        <section className="section">
          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route
            exact
            path={routes.SIGN_UP}
            component={() => <SignupPage />}
          />
          <Route
            exact
            path={routes.SIGN_IN}
            component={() => <SigninPage />}
          />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          <Route
            exact
            path={routes.USERS}
            component={() => <UsersPage />}
          />
          <Route
            exact
            path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
        </section>
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
