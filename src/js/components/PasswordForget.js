import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';

const PasswordForgetPage = () => (
  <div className="has-text-centered">
    <PasswordForgetForm />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Password Forget</h3>
        <div className="box">
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  value={this.state.email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <button className="button is-block is-info" disabled={isInvalid} type="submit">
            Reset My Password
            </button>
          </form>
          { error && <p className="help is-danger">{error.message}</p> }
        </div>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget" href="/pw-forget">Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
