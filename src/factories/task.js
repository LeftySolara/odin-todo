/**
 * Enum representing task priority.
 */
const TASK_PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

/**
 * Enum representing task status.
 */
const TASK_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETE: 2,
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
  priority = TASK_PRIORITY.MEDIUM,
) => {
  if (id === undefined || id < 0 || title === undefined) {
    return null;
  }

  let subtasks = [];
  let nextSubtaskID = 0;

  /**
   * Creates a new subtask within a task.
   *
   * @param {string} taskDescription A description of the subtask.
   */
  const addSubtask = (taskDescription) => {
    const subtask = {
      id: nextSubtaskID,
      description: taskDescription,
      status: TASK_STATUS.NOT_STARTED,
    };
    subtasks.push(subtask);
    nextSubtaskID += 1;
  };

  /**
   * Removes a subtask.
   *
   * @param {number} subtaskID The ID of the subtask to remove.
   */
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
