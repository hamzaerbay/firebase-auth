import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => (
  <div className="has-text-centered">
    <SignUpForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: '',
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    const {
      username, email, passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.USERS);
          })
          .catch((error) => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });
    e.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Sign Up</h3>
        <p className="subtitle has-text-grey">Please login to proceed.</p>
        <div className="box">
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  value={username}
                  onChange={event => this.setState(byPropKey('username', event.target.value))}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  value={passwordTwo}
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <button className="button is-block is-info" disabled={isInvalid} type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <p className="help is-danger">{ error && error.message }</p>
      </div>
    );
  }
}


export const SignUpLink = () => (
  <p>
    Dont have an account?
    {' '}
    <Link to={routes.SIGN_UP} href={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);
