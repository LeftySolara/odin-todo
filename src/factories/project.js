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
   * @param {string} taskTitle The title of the new task.
   * @param {*} taskDescription The description of the new task.
   */
  const addTask = (taskTitle, taskDescription) => {
    const newTask = createTask(nextID, taskTitle, taskDescription);
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
