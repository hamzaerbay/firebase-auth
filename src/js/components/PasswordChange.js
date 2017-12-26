import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Password Change</h3>
        <div className="box">
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="New Password"
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
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
            <button className="button is-block is-info" disabled={isInvalid} type="submit">
            Change My Password
            </button>
          </form>
          { error && <p className="help is-danger">{error.message}</p> }
        </div>
      </div>
    );
  }
}

export default PasswordChangeForm;
