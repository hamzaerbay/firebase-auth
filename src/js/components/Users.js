import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class UsersPage extends Component {
  componentDidMount() {
    const { userStore } = this.props;
    db.onceGetUsers().then(snapshot =>
      userStore.setUsers(snapshot.val()));
  }

  render() {
    const { users } = this.props.userStore;
    return (
      <div>
        <p>The Users Page is accessible by every signed in user.</p>
        { !!users && <UserList users={users} /> }

      </div>
    );
  }
}

const UserList = users => (
  <div>
    <h3 className="subtitle">List of Usernames of Users</h3>
    {Object.keys(users).map(key =>
      (
        <div className="tags" key={key}>
          {
          Object.keys(users[key]).map(item => (
            <div
              key={Math.random() * 100}
              className="tag is-info"
            >{users[key][item].username}
            </div>))
          }
        </div>
      ))}
  </div>
);
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition), inject('userStore'), observer)(UsersPage);
