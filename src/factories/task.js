/**
 * Creates a new Task object.
 *
 * @param {number} id The task's ID number.
 * @param {string} title The task's title.
 * @param {string} description A description of the task.
 * @returns {obj} a new Task object.
 */
const createTask = (id, title, description = '') => {
  if (id === undefined || id < 0 || title === undefined) {
    return null;
  }

  const taskID = id;
  const taskTitle = title;
  const taskDescription = description;

  return { id: taskID, title: taskTitle, description: taskDescription };
};

export default createTask;
