import React from 'react';

function FormError({ errorText, classMod }) {
  return (
    <div className={`form__error ${classMod}`}>{errorText}</div>
  );
}
FormError.defaultProps = {
  errorText: 'Что-то пошло не так...'
};

export default FormError;
