import './sidebar.css';
import React from 'react';

const Sidebar = (props) => {
  const { width, height, children } = props;

  return (
    <div className="sidebar" style={{ width, minHeight: height }}>
      <>{children}</>
    </div>
  );
};

export default Sidebar;
