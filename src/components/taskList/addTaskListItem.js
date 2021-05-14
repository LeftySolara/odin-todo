import React, { useEffect, useState, useRef } from 'react';
import createTask from '../../factories/task';

/**
 * A form used for creating new tasks.
 *
 * @param {Object} props Props to pass to the component.
 * @param {function} props.onSubmit Callback function that executes when the form is submitted.
 * @param {function} props.onBlur Callback function that executes when the form loses focus.
 */
const AddTaskForm = (props) => {
  const { onSubmit } = props;
  const [text, setText] = useState();
  const textInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = createTask({ title: text });
    onSubmit(task);
    setText('');
  };

  // Focus the input field on render.
  useEffect(() => {
    textInput.current.focus();
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="task-title"
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Title"
        ref={textInput}
        required
      />
    </form>
  );
};

/**
 * TaskList item that displays a form or button used for creating new tasks.
 *
 * @param {Object} props Props to pass to the component.
 * @param {function} onSubmit Callback function to execute when a project is added.
 */
const AddTaskListItem = (props) => {
  const { onSubmit } = props;

  return <AddTaskForm onSubmit={onSubmit} />;
};

export default AddTaskListItem;
