import React from 'react';
import { access } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import iconChecked from '../../images/icon-checked.svg';
import iconRemove from '../../images/icon-remove.svg';
import './MoviesCard.css';

function MoviesCard({card, nameRU, duration, image, trailerLink, userCards, handleCard }) {
  const { moviesUrl } = access;
  const cardId = Boolean(card.movieId) ? card.movieId : card.id;
  const isSavedCard = userCards.some(item => item === cardId);

  const { formats, url } = image;
  const { country, director, year, description, nameEN, id } = card;
  const picture = Boolean(image.url) ? `${moviesUrl}${url}` : image;
  //const picture = Boolean(image.url) ? `${moviesUrl}${url}` : image;
  
  function toggleCard() {
    handleCard({
      country,
      director,
      duration,
      year,
      description,
      image: picture,
      trailerLink,
      nameRU,
      nameEN,
      //thumbnail: `${moviesUrl}${formats.thumbnail.url}`,
      movieId: id
    });
  }
  console.log(card.id);

  return (
    <article className="card">
      <header className="card__header">
        <h2 className="card__title">{cardId} {nameRU}</h2>
        <span className="card__duration">{duration} минут</span>
      </header>
      <a className="card__link" href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="card__picture" src={picture} alt={nameRU} />
      </a>
      <footer className="card__footer">
        <button className={`card__btn ${isSavedCard && 'card__btn_active'}`} type="button" onClick={toggleCard}>
          {isSavedCard ? <img className="card__btn-checked" src={iconChecked} alt="Фильм добавлен в коллекцию" /> : 'Сохранить'}
          <img className="card__btn-remove" src={iconRemove} alt="Удалить коллекции" />
        </button>
      </footer>
    </article>
  );
}

export default MoviesCard;
