import React from 'react';

/**
 * Generic button component.
 *
 * @param {Object} props Props to pass to the component.
 * @param {string} text The text to display on the button.
 * @param {function} onClick A callback function to execute when the button is clicked.
 */
const GenericButton = (props) => {
  const { text, onClick } = props;

  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default GenericButton;
