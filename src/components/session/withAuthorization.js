/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const { firebase, history } = props;
    const authUser = useState(null);

    useEffect(() => {
      firebase.auth.onAuthStateChanged((user) => {
        if (!condition(user)) {
          history.push(ROUTES.SIGN_IN);
        }
      });
      return null;
    }, [authUser]);

    return (
      <AuthUserContext.Consumer>
        {(user) => (condition(user) ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  };

  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;
