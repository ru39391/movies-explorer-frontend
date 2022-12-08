import React from 'react';
import { access } from '../../utils/constants';
import iconChecked from '../../images/icon-checked.svg';
import iconRemove from '../../images/icon-remove.svg';
import './MoviesCard.css';

function MoviesCard({card, nameRU, duration, image, active, index}) {
  const { cardsUrl } = access;
  return (
    <article className="card">
      <header className="card__header">
        <h2 className="card__title">{index} {nameRU}</h2>
        <span className="card__duration">{duration} минут</span>
      </header>
      <img className="card__picture" src={`${cardsUrl}${image}`} alt={nameRU} />
      <footer className="card__footer">
        <button className={`card__btn ${active && 'card__btn_active'}`} type="button">
          {active ? <img className="card__btn-checked" src={iconChecked} alt="Фильм добавлен в коллекцию" /> : 'Сохранить'}
          <img className="card__btn-remove" src={iconRemove} alt="Удалить коллекции" />
        </button>
      </footer>
    </article>
  );
}

export default MoviesCard;
