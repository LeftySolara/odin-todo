import React, { useEffect, useRef, useState } from 'react';
import createProject from '../../factories/project';
import { withFirebase } from '../firebase';

const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat({ name: action.title, id: action.id });
    case 'DELETE':
      return state.filter((obj) => obj.id !== action.id);
    default:
      throw new Error();
  }
};

/**
 * Form component for adding or editing project information.
 *
 * @param {Object} props Props to pass to the component.
 * @param {string} props.initialText Text to display in the input field on render.
 * @param {function} props.onSubmit A callback function to execute when the form is submitted. The input's text is passed to this function.
 */
const ProjectListForm = (props) => {
  const { initialText, onSubmit } = props;
  const [text, setText] = useState(initialText);
  const textInput = useRef(null);

  // Focus the input field on render.
  useEffect(() => {
    textInput.current.focus();
  });

  return (
    <form onSubmit={() => onSubmit(text)}>
      <input
        name="project-title"
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Project Name"
        ref={textInput}
      />
    </form>
  );
};

/**
 * Button component for use in lists.
 *
 * @param {Object} props Props to pass to the component.
 * @param {string} props.text Text to display on the button.
 * @param {function} props.onClick A callback function to execute when the button is pressed.
 */
const ProjectListButton = (props) => {
  const { text, onClick } = props;

  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};

/**
 * List item component for the project list.
 *
 * @param {Object} props Props to pass to the component.
 * @param {string} text The text to show in the list,
 * @param {function} handleDelete A callback function to execute when the "delete" button is pressed.
 */
const ProjectListItem = (props) => {
  const { text, handleDelete } = props;

  return (
    <div className="project-list-item">
      <p>{text}</p>
      <ProjectListButton text="delete" onClick={handleDelete} />
    </div>
  );
};

/**
 * React component that displays a list of the user's projects.
 */
const ProjectListBase = (props) => {
  const { firebase } = props;

  const [editing, setEditing] = useState(false);
  const [listItems, dispatchListItems] = React.useReducer(listReducer, []);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleAdd = (name) => {
    const project = createProject(name);
    dispatchListItems({ type: 'ADD', title: project.title, id: project.id });
    firebase.addProject(project);
    toggleEditing();
  };

  const handleDelete = (projectID) => {
    firebase.deleteProject(projectID);
    dispatchListItems({ type: 'DELETE', id: projectID });
  };

  useEffect(() => {
    // Pull the existing project list from the database.
    firebase.currentUserProjects((snapshot) => {
      snapshot.forEach((snap) => {
        const data = snap.val();
        dispatchListItems({ type: 'ADD', title: data.title, id: data.id });
      });
    });
  }, []);

  return (
    <div>
      <ul>
        {listItems.map((item) => (
          <li>
            <ProjectListItem
              text={item.name}
              handleDelete={() => handleDelete(item.id)}
            />
          </li>
        ))}
      </ul>

      {editing ? (
        <ProjectListForm initialText="" onSubmit={handleAdd} />
      ) : (
        <ProjectListButton text="Add Project" onClick={toggleEditing} />
      )}
    </div>
  );
};

const ProjectList = withFirebase(ProjectListBase);

export default ProjectList;
