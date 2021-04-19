import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpFormBase = (props) => {
  const [username, setUsername] = useState(INITIAL_STATE.username);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
  const [error, setError] = useState(INITIAL_STATE.error);

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  const resetState = () => {
    setUsername(INITIAL_STATE.username);
    setEmail(INITIAL_STATE.email);
    setPasswordOne(INITIAL_STATE.passwordOne);
    setPasswordTwo(INITIAL_STATE.passwordTwo);
    setError(INITIAL_STATE.error);
  };

  const onSubmit = (event) => {
    const { firebase, history } = props;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create the user in the Firebase realtime database.
        return firebase.user(authUser.user.uid).set({ username, email });
      })
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
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export { SignUpPage as default, SignUpForm, SignUpLink };
