import React from 'react';

import { ForgotPasswordForm } from '../forgotPassword';
import ChangePasswordForm from '../changePassword';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <ForgotPasswordForm />
    <ChangePasswordForm />
  </div>
);

export default AccountPage;
