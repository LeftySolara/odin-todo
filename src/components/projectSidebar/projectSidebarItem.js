import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from 'react-pro-sidebar';
import * as ROUTES from '../../constants/routes';

const DeleteProjectButton = (props) => {
  const { handleDelete } = props;

  return (
    <button type="button" onClick={handleDelete}>
      Delete
    </button>
  );
};

/**
 * An item in the project sidebar.
 *
 * @param {Object} props Props to pass to the component.
 * @param {string} text The project name to display on the sidebar.
 * @param {string} id The id of the project.
 */
const ProjectSidebarItem = (props) => {
  const { text, id, handleDelete } = props;
  const url = id.substring(0, 8);

  return (
    <MenuItem key={id}>
      <div className="sidebar-item">
        <Link to={`${ROUTES.PROJECT}/${url}`}>{text}</Link>
        <DeleteProjectButton handleDelete={handleDelete} />
      </div>
    </MenuItem>
  );
};

export default ProjectSidebarItem;
