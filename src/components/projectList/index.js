import React, { useEffect, useRef, useState } from 'react';

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

/**
 * React component that displays a list of the user's projects.
 * @param {Array} props.initialList The initial list of projects to display.
 */
const ProjectList = (props) => {
  // TODO: pull initial list from backend
  // TODO: generate uuid for each item
  const { initialList } = props;

  const [listItems, setListITems] = useState(initialList);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleAdd = (name) => {
    const newListItems = listItems.concat({ name, id: 0 });
    setListITems(newListItems);
    toggleEditing();
  };

  return (
    <div>
      <ul>
        {listItems.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>

      {isEditing ? (
        <AddProjectForm onSubmit={handleAdd} />
      ) : (
        <AddProjectButton onClick={toggleEditing} />
      )}
    </div>
  );
};

export default ProjectList;
