import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  /**
   * Handle on submit form event to call parent's submit function
   * @param {Object} event 
   */
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  /**
   * Handle cancel form event to call parent's cancel function
   * @param {Object} event 
   */
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      {/* For validation errors */}
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {/* elements passed from parent component */}
        {elements()}
        {/* Buttons for on submit and cancel form */}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

/**
 * Stateless component to show validation errors 
 * @param {Array} param0 
 */
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
