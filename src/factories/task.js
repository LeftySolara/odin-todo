/**
 * Enum representing task priority.
 * @readonly
 * @enum {number}
 */
const TASK_PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

/**
 * Enum representing task status.
 * @readonly
 * @enum {number}
 */
const TASK_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETE: 2,
};

/**
 * Creates a new Task object.
 *
 * @param {Object} taskData - Information to initialie the task with.
 * @param {number} taskData.id - The ID number of the task.
 * @param {string} taskData.title - The title of the task.
 * @param {string} taskData.description - A brief description of the task.
 * @param {Date} taskData.dueDate - The date the task is due.
 * @param {TASK_PRIORITY} taskData.priority - The priority of the task (high, medium, or low).
 */
const createTask = (taskData) => {
  if (
    taskData.id === undefined ||
    taskData.id < 0 ||
    taskData.title === undefined
  ) {
    return null;
  }

  const { id, title, description, dueDate, priority } = taskData;
  const status = TASK_STATUS.NOT_STARTED;

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
    status,
    addSubtask,
    deleteSubtask,
    subtaskCount,
  };
};

export default createTask;
