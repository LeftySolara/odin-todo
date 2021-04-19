import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../signOut';
import styles from './navigation.module.css';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../session';

const Navigation = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <div className={styles.navigation}>
      {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </div>
  );
};

const NavigationAuth = () => (
  <ul className={styles['navigation-list']}>
    <li className={styles['navigation-list-item']}>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li className={styles['navigation-list-item']}>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li className={styles['navigation-list-item']}>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li className={styles['navigation-list-item']}>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className={styles['navigation-list']}>
    <li className={styles['navigation-list-item']}>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li className={styles['navigation-list-item']}>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
