/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const { firebase } = props;
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      firebase.auth.onAuthStateChanged((user) => {
        // eslint-disable-next-line no-unused-expressions
        user ? setAuthUser(user) : setAuthUser(null);
      });
      return null;
    }, [authUser]);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
