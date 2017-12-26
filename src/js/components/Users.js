import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class UsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() })));
  }

  render() {
    const { users } = this.state;
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

export default withAuthorization(authCondition)(UsersPage);
