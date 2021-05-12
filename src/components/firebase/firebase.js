import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectID: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderID: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  /* Auth API */

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  /* *** User API *** */

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  /* *** Project API *** */

  /**
   * Fetches the current user's projects from the database.
   *
   * @param {function} callback A callback function to execute once the fetch is complete.
   * @returns {Promise} A promise containing the data snapshot from the DB fetch.
   */
  currentUserProjects = (callback) =>
    this.db
      .ref(`projects/${this.auth.currentUser.uid}`)
      .once('value', callback);

  addProject = (project) => {
    const { uid } = this.auth.currentUser;
    const ref = this.db.ref(`projects/${uid}/${project.id}`);
    ref.set({
      id: project.id,
      title: project.title,
      dateCreated: project.dateCreated,
    });
  };

  /**
   * Removes a project from the database. This also deletes all tasks in the project.
   *
   * @param {Number} id The ID of the project.
   */
  deleteProject = (projectID) => {
    const ref = this.db.ref(
      `projects/${this.auth.currentUser.uid}/${projectID}`,
    );
    ref.remove();
  };

  /* *** Task API *** */

  /**
   * Fetches the current user's tasks from the database.
   *
   * @param {function} callback A callback function to execute once the fetch is complete.
   * @returns  {Promise} A promise containing the data snapshot from the DB fetch.
   */
  currentUserTasks = (callback) =>
    this.db.ref(`tasks/${this.auth.currentUser.uid}`).once('value', callback);

  /**
   * Adds a task to the database.
   *
   * @param {Object} task Object containing task information.
   * @param {string} task.id The uuid of the task.
   * @param {string} task.title The title of the task.
   * @param {string} task.description A brief description of the task.
   * @param {enum} task.priority The priority of the task.
   * @param {enum} task.status The status of the task.
   */
  addTask = (task) => {
    const { uid } = this.auth.currentUser;
    const ref = this.db.ref(`tasks/${uid}/${task.id}`);
    ref.set({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    });
  };

  /**
   * Removes a task from the database.
   *
   * @param {string} taskID The uuid of the task.
   */
  deleteTask = (taskID) => {
    const ref = this.db.ref(`tasks/${this.auth.currentUser.uid}/${taskID}`);
    ref.remove();
  };
}

export default Firebase;
