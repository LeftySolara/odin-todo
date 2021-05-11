import React from 'react';

import { withAuthorization } from '../session';
import ProjectSidebar from '../projectSidebar';

const HomePage = () => (
  <>
    <ProjectSidebar />
  </>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
