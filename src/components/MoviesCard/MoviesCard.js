import React from 'react';
import { access } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import iconChecked from '../../images/icon-checked.svg';
import iconRemove from '../../images/icon-remove.svg';
import './MoviesCard.css';

function MoviesCard({card, nameRU, duration, image, trailerLink, handleCard, active, index}) {
  const { moviesUrl } = access;
  const currentUserId = React.useContext(CurrentUserContext).id;

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

  return (
    <article className="card">
      <header className="card__header">
        <h2 className="card__title">{index} {nameRU}</h2>
        <span className="card__duration">{duration} минут</span>
      </header>
      <a className="card__link" href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="card__picture" src={picture} alt={nameRU} />
      </a>
      <footer className="card__footer">
        <button className={`card__btn ${active && 'card__btn_active'}`} type="button" onClick={toggleCard}>
          {active ? <img className="card__btn-checked" src={iconChecked} alt="Фильм добавлен в коллекцию" /> : 'Сохранить'}
          <img className="card__btn-remove" src={iconRemove} alt="Удалить коллекции" />
        </button>
      </footer>
    </article>
  );
}

export default MoviesCard;
