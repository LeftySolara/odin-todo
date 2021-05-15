import React, { useState } from 'react';
import ProjectSidebar from '../projectSidebar';
import TaskList from '../taskList';
import CurrentProjectContext from './context';

const ProjectPage = () => {
  const [currentProject, setCurrentProject] = useState('0');
  const value = { currentProject, setCurrentProject };

  return (
    <CurrentProjectContext.Provider value={value}>
      <div>
        <ProjectSidebar />
        <TaskList />
      </div>
    </CurrentProjectContext.Provider>
  );
};

export default ProjectPage;
