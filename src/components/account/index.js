import React from 'react';

import { ForgotPasswordForm } from '../forgotPassword';
import ChangePasswordForm from '../changePassword';
import { AuthUserContext, withAuthorization } from '../session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1> Account: {authUser.email}</h1>
        <ForgotPasswordForm />
        <ChangePasswordForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
