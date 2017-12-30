import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';


const AccountPage = ({ sessionStore }) => (
  <div className="has-text-centered">
    <h1 className="title">Welcome  - {sessionStore.authUser.email}
    </h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition), inject('sessionStore'), observer)(AccountPage);
