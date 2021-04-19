import React, { useEffect, useState } from 'react';

import { withFirebase } from '../firebase';

const AdminPage = (props) => {
  const { firebase } = props;

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      let usersList = [];

      if (usersObject) {
        usersList = Object.keys(usersObject).map((key) => ({
          ...usersObject[key],
          uid: key,
        }));
      }

      setUsers(usersList);
      setLoading(false);
    });
    return () => firebase.users().off();
  });

  return (
    <div>
      <h1>Admin</h1>

      {loading && <div>Loading...</div>}

      <UserList users={users} />
    </div>
  );
};

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        <span>
          <strong>ID:</strong> {user.id}
        </span>
        <span>
          <strong>Email:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);
