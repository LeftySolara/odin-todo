import { v5 as uuidv5 } from 'uuid';

const TASK_UUID_NAMESPACE = 'b1a166c1-d556-4027-8717-56e7dcd702d5';
const SUBTASK_UUID_NAMESPACE = 'e5ec46a2-3d9d-4e64-9dc2-53081deac669';

/**
 * Enum representing task priority.
 * @readonly
 * @enum {number}
 */
// eslint-disable-next-line no-unused-vars
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
 * @param {string} taskData.title - The title of the task.
 * @param {string} taskData.description - A brief description of the task.
 * @param {Date} taskData.dueDate - The date the task is due.
 * @param {TASK_PRIORITY} taskData.priority - The priority of the task (high, medium, or low).
 */
const createTask = (taskData) => {
  if (taskData.title === undefined) {
    return null;
  }

  const {
    title,
    description = '',
    dueDate = 0,
    priority = TASK_PRIORITY.MEDIUM,
  } = taskData;

  const status = TASK_STATUS.NOT_STARTED;
  const id = uuidv5(title, TASK_UUID_NAMESPACE);
  let subtasks = [];

  /**
   * Creates a new subtask within a task.
   *
   * @param {string} taskDescription A description of the subtask.
   * @returns {string} The uuid of the subtask.
   */
  const addSubtask = (taskDescription) => {
    const subtask = {
      id: uuidv5(taskDescription, SUBTASK_UUID_NAMESPACE),
      description: taskDescription,
      status: TASK_STATUS.NOT_STARTED,
    };
    subtasks.push(subtask);
    return subtask.id;
  };

  /**
   * Removes a subtask.
   *
   * @param {string} subtaskID The uuid of the subtask to remove.
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
