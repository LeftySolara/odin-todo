import './projectSidebar.css';
import React, { useEffect } from 'react';

import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
} from 'react-pro-sidebar';
import AddProjectItem from './addProjectItem';
import ProjectSidebarItem from './projectSidebarItem';
import createProject from '../../factories/project';

import { withFirebase } from '../firebase';

import 'react-pro-sidebar/dist/css/styles.css';

const projectListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat({ title: action.title, id: action.id });
    case 'DELETE':
      return state.filter((obj) => obj.id !== action.id);
    default:
      throw new Error();
  }
};

const ProjectSidebarBase = (props) => {
  const { firebase } = props;

  const [listItems, dispatchListItems] = React.useReducer(
    projectListReducer,
    [],
  );

  /**
   * Adds a project to the backend database.
   *
   * @param {string} name The name of the project.
   */
  const handleAdd = (name) => {
    const project = createProject(name);
    dispatchListItems({ type: 'ADD', title: project.title, id: project.id });
    firebase.addProject(project);
  };

  const handleDelete = (id) => {
    firebase.deleteProject(id);
    dispatchListItems({ type: 'DELETE', id });
  };

  useEffect(() => {
    // Pull a list of existing projects from the database.
    firebase.currentUserProjects((snapshot) => {
      snapshot.forEach((snap) => {
        const data = snap.val();
        dispatchListItems({ type: 'ADD', title: data.title, id: data.id });
      });
    });
  }, []);

  return (
    <ProSidebar>
      <SidebarHeader>Projects</SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          {listItems.map((item) => {
            return (
              <ProjectSidebarItem
                text={item.title}
                id={item.id}
                handleDelete={() => handleDelete(item.id)}
              />
            );
          })}
          <MenuItem>
            <AddProjectItem onSubmit={handleAdd} />
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

const ProjectSidebar = withFirebase(ProjectSidebarBase);

export default ProjectSidebar;
