import React, { useState } from 'react';
import { withFirebase } from '../firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ChangePasswordForm = (props) => {
  const { firebase } = props;

  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  const resetState = () => {
    setPasswordOne(INITIAL_STATE.passwordOne);
    setPasswordTwo(INITIAL_STATE.passwordTwo);
    setError(INITIAL_STATE.error);
  };

  const onSubmit = (event) => {
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        resetState();
      })
      .catch((err) => setError(err));

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withFirebase(ChangePasswordForm);
