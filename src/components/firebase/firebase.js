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

  /**
   * Creates a new user with a default project.
   *
   * @param {string} email The user's email address.
   * @param {string} password The user's password.
   */
  doCreateUserWithEmailAndPassword = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password);

    const defaultProject = { id: 0, title: 'Default', dateCreated: Date.now() };
    this.db
      .ref(`projects/${this.auth.currentUser.uid}`)
      .child('0')
      .set(defaultProject);
  };

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
}

export default Firebase;
