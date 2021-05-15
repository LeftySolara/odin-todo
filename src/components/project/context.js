import React from 'react';

const CurrentProjectContext = React.createContext({
  currentProject: '0',
  setCurrentProject: () => {},
});

export default CurrentProjectContext;
