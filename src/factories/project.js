import { v5 as uuidv5 } from 'uuid';
import createTask from './task';

const PROJECT_UUID_NAMESPACE = '42feb71f-04c7-4a51-a826-f887a8319d3a';

/**
 * Creates a new Project object.
 *
 * @param {string} projectTitle The project's title.
 */
const createProject = (projectTitle) => {
  const title = projectTitle;
  const id = uuidv5(title, PROJECT_UUID_NAMESPACE);
  const dateCreated = new Date().getTime();
  let tasks = [];

  const taskCount = () => tasks.length;

  /**
   * Adds a new task to the project.
   *
   * @param {Object} taskData - Information to initialie the task with.
   * @param {string} taskData.title - The title of the task.
   * @param {string} taskData.description - A brief description of the task.
   * @param {Date} taskData.dueDate - The date the task is due.
   * @param {TASK_PRIORITY} taskData.priority - The priority of the task (high, medium, or low).
   * @returns {string} - The uuid of the new task.
   */
  const addTask = (taskData) => {
    const newTask = createTask(taskData);
    tasks.push(newTask);
    return newTask.id;
  };

  const deleteTask = (taskID) => {
    tasks = tasks.filter((task) => {
      return task.id !== taskID;
    });
  };

  return { id, title, dateCreated, taskCount, addTask, deleteTask };
};

export default createProject;
