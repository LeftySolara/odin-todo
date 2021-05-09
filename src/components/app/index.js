import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation';
import LandingPage from '../landing';
import SignUpPage from '../signUp';
import SignInPage from '../signIn';
import ForgotPasswordPage from '../forgotPassword';
import ChangePasswordPage from '../changePassword';
import HomePage from '../home';
import AccountPage from '../account';
import AdminPage from '../admin';
import ProjectPage from '../project';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordPage} />
      <Route path={ROUTES.CHANGE_PASSWORD} component={ChangePasswordPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.PROJECT} component={ProjectPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
