import React from 'react';
import { access } from '../../utils/constants';
import iconChecked from '../../images/icon-checked.svg';
import iconRemove from '../../images/icon-remove.svg';
import './MoviesCard.css';

function MoviesCard({card, nameRU, duration, image, trailerLink, active, index}) {
  const { moviesUrl } = access;
  return (
    <article className="card">
      <header className="card__header">
        <h2 className="card__title">{index} {nameRU}</h2>
        <span className="card__duration">{duration} минут</span>
      </header>
      <a className="card__link" href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="card__picture" src={`${moviesUrl}${image}`} alt={nameRU} />
      </a>
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
