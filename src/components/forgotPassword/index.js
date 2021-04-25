import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const ForgotPasswordPage = () => (
  <div>
    <h1>Forgot Password</h1>
    <ForgotPasswordForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

const ForgotPasswordFormBase = (props) => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [error, setError] = useState(INITIAL_STATE.error);

  const isInvalid = email === '';

  const resetState = () => {
    setEmail(INITIAL_STATE.email);
    setError(INITIAL_STATE.error);
  };

  const onSubmit = (event) => {
    const { firebase } = props;

    firebase
      .doPasswordReset(email)
      .then(() => {
        resetState();
      })
      .catch((err) => setError(err));

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const ForgotPasswordLink = () => (
  <p>
    <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</Link>
  </p>
);

const ForgotPasswordForm = withFirebase(ForgotPasswordFormBase);

export {
  ForgotPasswordPage as default,
  ForgotPasswordForm,
  ForgotPasswordLink,
};
