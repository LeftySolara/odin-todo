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
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpFormBase = (props) => {
  const [firstName, setFirstName] = useState(INITIAL_STATE.username);
  const [lastName, setLastName] = useState(INITIAL_STATE.lastName);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
  const [error, setError] = useState(INITIAL_STATE.error);

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    firstName === '' ||
    lastName === '';

  const resetState = () => {
    setFirstName(INITIAL_STATE.firstName);
    setLastName(INITIAL_STATE.lastName);
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
        // Update Firebase realtime database with user info.
        return firebase
          .user(authUser.user.uid)
          .set({ email, firstName, lastName });
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
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        placeholder="First Name"
      />
      <input
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        placeholder="Last Name"
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
