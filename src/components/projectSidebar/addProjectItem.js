import React, { useEffect, useState, useRef } from 'react';
import GenericButton from '../genericButton';

/**
 * A text input used for creating new projects.
 *
 * @param {Object} props Props to pass to the component.
 * @param {function} props.onSubmit Callback function that executes when the form is submitted.
 * @param {function} props.onBlur Callback function that executes when the form loses focus.
 */
const AddProjectForm = (props) => {
  const { onSubmit, onBlur } = props;
  const [text, setText] = useState();
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
        onBlur={onBlur}
        placeholder="Project Name"
        ref={textInput}
        required
      />
    </form>
  );
};

/**
 * Project sidebar item used for creating new projects.
 *
 * @param {Object} props Props to pass to the component.
 * @param {function} onSubmit Callback function to execute when a project is added.
 */
const AddProjectItem = (props) => {
  const { onSubmit } = props;
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => setEditing(!editing);

  return (
    // prettier-ignore
    <>
      {editing
      ? <AddProjectForm onSubmit={onSubmit} onBlur={toggleEditing} />
      : <GenericButton text="Add Project" onClick={toggleEditing} />
      }
    </>
  );
};

export default AddProjectItem;
