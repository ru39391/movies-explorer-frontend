import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ cards, isNoResults, active }) {
  return (
    <div className={`card-list ${!isNoResults && 'card-list_noresults'}`}>
      {!isNoResults && 'Ничего не найдено'}
      {cards.map((cardsItem) => (
        <MoviesCard
          card={cardsItem}
          key={cardsItem.id}
          nameRU={cardsItem.nameRU}
          duration={cardsItem.duration}
          image={cardsItem.image.url}
          active={active}
        />
      ))}
    </div>
  );
}

export default MoviesCardList;
