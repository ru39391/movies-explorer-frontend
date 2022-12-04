import React from 'react';
import iconClose from '../../images/icon-close.svg';
import iconError from '../../images/icon-error.svg';
import './Popup.css';

function Popup() {
  return (
    <div className="popup">
      <div className="popup__wrapper">
        <button className="popup__btn-close" type="button">
          <img src={iconClose} alt="Закрыть окно" />
        </button>
        <div className="popup__header">
          <img src={iconError} alt="При авторизации произошла ошибка" />
        </div>
        <p className="popup__title">При авторизации произошла ошибка. Токен не передан или передан не в том формате.</p>
      </div>
    </div>
  );
}

export default Popup;
