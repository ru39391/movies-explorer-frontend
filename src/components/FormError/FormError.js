import React from 'react';

function FormError({ errorText }) {
  return (
    <div className='form__error'>{errorText}</div>
  );
}
FormError.defaultProps = {
  errorText: 'Что-то пошло не так...'
};

export default FormError;
