import createTask from './task';

/**
 * Creates a new Project object.
 *
 * @param {string} projectTitle The project's title.
 */
const createProject = (projectTitle) => {
  const title = projectTitle;
  let tasks = [];
  let nextID = 0;

  const taskCount = () => tasks.length;

  /**
   * Adds a new task to the project.
   *
   * @param {Object} taskData - Information to initialie the task with.
   * @param {string} taskData.title - The title of the task.
   * @param {string} taskData.description - A brief description of the task.
   * @param {Date} taskData.dueDate - The date the task is due.
   * @param {TASK_PRIORITY} taskData.priority - The priority of the task (high, medium, or low).
   */
  const addTask = (taskData) => {
    /* Add the ID property to the task data. */
    const tmp = { id: nextID };
    const data = Object.assign(tmp, taskData);

    const newTask = createTask(data);
    tasks.push(newTask);
    nextID += 1;
  };

  const deleteTask = (id) => {
    tasks = tasks.filter((task) => {
      return task.id !== id;
    });
  };

  return { title, taskCount, addTask, deleteTask };
};

export default createProject;
