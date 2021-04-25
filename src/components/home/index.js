import React from 'react';

import { withAuthorization } from '../session';
import Sidebar from '../sidebar';
import ProjectList from '../projectList';

const HomePage = () => {
  const listItems = [
    { name: 'List Item', id: 0 },
    { name: 'List Item', id: 1 },
    { name: 'List Item', id: 2 },
  ];

  return (
    <>
      <Sidebar width={300} height="100vh">
        <ProjectList initialList={listItems} />
      </Sidebar>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
