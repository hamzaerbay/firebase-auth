import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) => (
  <div className="has-text-centered">
    <SignInForm history={history} />
  </div>
);

const byPropKey = (propertName, value) => () => ({
  [propertName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
};

export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const {
      email,
      password,
    } = this.state;

    const { history } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.USERS);
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });
    e.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Login</h3>
        <p className="subtitle has-text-grey">Please login to proceed.</p>
        <div className="box">
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Your Email"
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  value={email}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Your Password"
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  value={password}
                />
              </div>
            </div>
            <button className="button is-block is-info" disabled={isInvalid} type="submit">
                  Sign In
            </button>
          </form>
          { error && <p className="help is-danger">{error.message}</p> }
        </div>
        <div className="has-text-grey">
          <PasswordForgetLink />
          <SignUpLink />
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);
