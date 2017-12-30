// Protection for auth pages
import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';
import * as routes from '../constants/routes';

const withAuthorization = authCondition => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged((authUser) => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.sessionStore.authUser ? <Component /> : null;
    }
  }
  return compose(withRouter, inject('sessionStore'), observer)(WithAuthorization);
};

export default withAuthorization;

