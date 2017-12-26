import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';


const AccountPage = (props, { authUser }) => (
  <div className="has-text-centered">
    <h1 className="title">Welcome  - {authUser.email}
    </h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);
AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
