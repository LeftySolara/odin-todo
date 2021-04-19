import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../signUp';
import { ForgotPasswordLink } from '../forgotPassword';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <ForgotPasswordLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInFormBase = (props) => {
  const { firebase, history } = props;

  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [error, setError] = useState(INITIAL_STATE.error);

  const isInvalid = password === '' || email === '';

  const resetState = () => {
    setEmail(INITIAL_STATE.email);
    setPassword(INITIAL_STATE.password);
    setError(INITIAL_STATE.error);
  };

  const onSubmit = (event) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        resetState();
        history.push(ROUTES.HOME);
      })
      .catch((err) => {
        setError(err);
      });

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
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = withRouter(withFirebase(SignInFormBase));

export { SignInPage as default, SignInForm };
