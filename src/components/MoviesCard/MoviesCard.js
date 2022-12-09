import React from 'react';
import { access } from '../../utils/constants';
import iconChecked from '../../images/icon-checked.svg';
import iconRemove from '../../images/icon-remove.svg';
import './MoviesCard.css';

function MoviesCard({card, nameRU, duration, image, trailerLink, userCards, userCardIds, addCard, removeCard }) {
  const { moviesUrl } = access;
  const currentCardId = Boolean(card.movieId) ? card.movieId : card.id;
  const currentCard = userCards.find(item => item.movieId === currentCardId);
  const isSavedCard = userCardIds.some(item => item === currentCardId);

  const { formats, url } = image;
  const { country, director, year, description, nameEN, thumbnail, id } = card;
  const picture = Boolean(image.url) ? `${moviesUrl}${url}` : image;
  const preview = Boolean(image.url) ? `${moviesUrl}${formats.thumbnail.url}` : thumbnail;
  
  function handleCard() {
    if(isSavedCard) {
      removeCard({
        movieId: currentCard._id
      });
    } else {
      addCard({
        country,
        director,
        duration,
        year,
        description,
        image: picture,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: preview,
        movieId: id
      });
    }
  }

  return (
    <article className="card">
      <header className="card__header">
        <h2 className="card__title">{nameRU}</h2>
        <span className="card__duration">{duration} минут</span>
      </header>
      <a className="card__link" href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="card__picture" src={picture} alt={nameRU} />
      </a>
      <footer className="card__footer">
        <button className={`card__btn ${isSavedCard && 'card__btn_active'}`} type="button" onClick={handleCard}>
          {isSavedCard ? <img className="card__btn-checked" src={iconChecked} alt="Фильм добавлен в коллекцию" /> : 'Сохранить'}
          <img className="card__btn-remove" src={iconRemove} alt="Удалить коллекции" />
        </button>
      </footer>
    </article>
  );
}

export default MoviesCard;
