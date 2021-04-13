const PRIORITIES = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

const STATUSES = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETE: 2,
};

const createSubtask = (id, description) => {
  const status = STATUSES.NOT_STARTED;
  return { id, description, status };
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

  let subtasks = [];
  let nextSubtaskID = 0;

  const addSubtask = (taskDescription) => {
    const subtask = createSubtask(nextSubtaskID, taskDescription);
    subtasks.push(subtask);
    nextSubtaskID += 1;
  };

  const deleteSubtask = (subtaskID) => {
    subtasks = subtasks.filter((subtask) => {
      return subtask.id !== subtaskID;
    });
  };

  const subtaskCount = () => subtasks.length;

  return {
    id,
    title,
    description,
    dueDate,
    priority,
    addSubtask,
    deleteSubtask,
    subtaskCount,
  };
};

export default createTask;
