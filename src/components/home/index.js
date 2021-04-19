import React from 'react';

import { withAuthorization } from '../session';

const HomePage = () => (
  <div>
    <h1>HomePage</h1>
    <p>The home page is accessible by every signed in user.</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
