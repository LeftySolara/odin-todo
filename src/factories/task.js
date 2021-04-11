const PRIORITIES = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

/**
 * Creates a new Task object.
 *
 * @param {number} id The task's ID number.
 * @param {string} title The task's title.
 * @param {string} description A description of the task.
 * @returns {obj} a new Task object.
 */
const createTask = (
  id,
  title,
  description = '',
  dueDate = 0,
  priority = PRIORITIES.MEDIUM,
) => {
  if (id === undefined || id < 0 || title === undefined) {
    return null;
  }

  return { id, title, description, dueDate, priority };
};

export default createTask;
