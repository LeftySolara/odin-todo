import React, { useEffect } from 'react';
import { withFirebase } from '../firebase';
import AddTaskListItem from './addTaskListItem';

const taskListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat(action.taskData);
    default:
      throw new Error();
  }
};

const TaskListBase = (props) => {
  const { firebase } = props;
  const [listItems, dispatchListItems] = React.useReducer(taskListReducer, []);

  /**
   * Adds a task to the database and the visible list.
   *
   * @param {Object} taskData An object containing information about the task.
   * @param {string} taskData.title The title of the task.
   * @param {string} taskData.description A brief description of the task.
   * @param {Date} taskData.dueDate The due date for the task.
   * @param {Number} taskData.priority The priority of the task.
   */
  const handleAdd = (taskData) => {
    dispatchListItems({ type: 'ADD', taskData });
    firebase.addTask(taskData);
  };

  useEffect(() => {
    // Pull a list of existing tasks from the database.
    firebase.currentUserTasks((snapshot) => {
      snapshot.forEach((snap) => {
        const taskData = snap.val();
        dispatchListItems({ type: 'ADD', taskData });
      });
    });
  }, []);

  return (
    <ul>
      {listItems.map((item) => {
        return <li>{item.title}</li>;
      })}
      <li>
        <AddTaskListItem onSubmit={handleAdd} />
      </li>
    </ul>
  );
};

const TaskList = withFirebase(TaskListBase);

export default TaskList;
