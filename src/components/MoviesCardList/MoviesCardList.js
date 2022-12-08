import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ cards, isNoResults, length, increment, active }) {
  const [CardsLenght, setCardsLenght] = React.useState(length);
  const [CardLoaderInvisible, setCardLoaderInvisible] = React.useState(cards.length < length);

  const filtredCards = cards.filter((item, index) => index < CardsLenght);
  function addCards() {
    setCardsLenght(CardsLenght + increment);
  }

  React.useEffect(() => {
    setCardsLenght(length);
  }, [length]);

  React.useEffect(() => {
    cards.length <= CardsLenght ? setCardLoaderInvisible(true) : setCardLoaderInvisible(false);
  }, [CardsLenght]);

  return (
    <>
      <div className={`card-list ${isNoResults && 'card-list_noresults'}`}>
        {isNoResults && 'Ничего не найдено'}
        {filtredCards.map((cardsItem, index) => (
          <MoviesCard
            index={index}
            card={cardsItem}
            key={cardsItem.id}
            nameRU={cardsItem.nameRU}
            duration={cardsItem.duration}
            image={cardsItem.image.url}
            active={active}
          />
        ))}
      </div>
      <div className={`show-more ${CardLoaderInvisible && 'show-more_invisible'}`}>
        <button className="show-more__btn" type="button" onClick={addCards}>Ещё</button>
      </div>
    </>
  );
}

export default MoviesCardList;
