import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from 'react-pro-sidebar';
import * as ROUTES from '../../constants/routes';

/**
 * An item in the project sidebar.
 *
 * @param {Object} props Props to pass to the component.
 * @param {string} text The project name to display on the sidebar.
 * @param {string} id The id of the project.
 */
const ProjectSidebarItem = (props) => {
  const { text, id } = props;
  const url = id.substring(0, 8);

  return (
    <MenuItem key={id}>
      {text}
      <Link to={`${ROUTES.PROJECT}/${url}`} />
    </MenuItem>
  );
};

export default ProjectSidebarItem;
