import React from 'react';

import { withAuthorization } from '../session';
import Sidebar from '../sidebar';
import ProjectList from '../projectList';

const HomePage = () => (
  <>
    <Sidebar width={300} height="100vh">
      <ProjectList initialList={[]} />
    </Sidebar>
  </>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
