import React from 'react';

const FirebaseContext = React.createContext(null);

/* eslint react/jsx-props-no-spreading: "off" */
const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export { FirebaseContext as default, withFirebase };
