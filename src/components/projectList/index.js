import React, { useEffect, useRef, useState } from 'react';
import createProject from '../../factories/project';
import { withFirebase } from '../firebase';

/**
 * Simple button that fires the given callback function.
 *
 * @param {function} onClick The callback function to fire when clicked.
 */
const AddProjectButton = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    Add Project
  </button>
);

/**
 * Text input for creating a new project with a given name.
 *
 * @param {function} onSubmit The callback function to fire when the form is submitted.
 */
const AddProjectForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const text1 = useRef(null);

  // Focus the input field on render.
  useEffect(() => {
    text1.current.focus();
  });

  return (
    <form onSubmit={() => onSubmit(name)}>
      <input
        name="project-name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        ref={text1}
      />
    </form>
  );
};

const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat({ name: action.title, id: action.id });
    default:
      throw new Error();
  }
};

/**
 * React component that displays a list of the user's projects.
 * @param {Array} props.initialList The initial list of projects to display.
 */
const ProjectListBase = (props) => {
  // TODO: pull initial list from backend
  // TODO: generate uuid for each item
  const { firebase, initialList } = props;

  const [editing, setEditing] = useState(false);
  const [listItems, dispatchListItems] = React.useReducer(
    listReducer,
    initialList,
  );

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleAdd = (name) => {
    const project = createProject(name);
    dispatchListItems({ type: 'ADD', title: project.title, id: project.id });
    firebase.addProject(project);
    toggleEditing();
  };

  return (
    <div>
      <ul>
        {listItems.map((item) => (
          <li>
            {item.id} {item.name}
          </li>
        ))}
      </ul>

      {editing ? (
        <AddProjectForm onSubmit={handleAdd} />
      ) : (
        <AddProjectButton onClick={toggleEditing} />
      )}
    </div>
  );
};

const ProjectList = withFirebase(ProjectListBase);

export default ProjectList;
