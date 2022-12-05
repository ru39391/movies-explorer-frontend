import React from 'react';
import iconClose from '../../images/icon-close.svg';
import iconError from '../../images/icon-error.svg';
import iconSuccess from '../../images/icon-success.svg';
import './Popup.css';

function Popup({title, isOpen, isError, onHandleVisibility}) {
  return (
    <div className={`popup ${isOpen && 'popup_active'} ${isError && 'popup_type_error'}`}>
      <div className="popup__wrapper">
        <button className="popup__btn-close" type="button" onClick={onHandleVisibility}>
          <img src={iconClose} alt="Закрыть окно" />
        </button>
        <div className="popup__header">
          <img src={isError ? iconError : iconSuccess} alt={title} />
        </div>
        <p className="popup__title">{title}</p>
      </div>
    </div>
  );
}

export default Popup;
