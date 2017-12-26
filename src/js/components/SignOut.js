import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () =>
  (
    <div className="navbar-item">
      <p className="control">
        <button
          className="is-danger button is-small is-outlined"
          type="button"
          onClick={auth.doSignOut}
        >
    Sign Out
        </button>
      </p>
    </div>
  );

export default SignOutButton;
