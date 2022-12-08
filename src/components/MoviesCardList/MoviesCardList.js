import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { gridParamsData } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({ cards, isNoResults, loaderData, handleCard, active }) {
  const { desktopData } = gridParamsData;
  const increment = loaderData ? loaderData.increment : false;
  const [LoaderData, setLoaderData] = React.useState({
    length: Boolean(increment) ? desktopData.length : 0,
    increment: Boolean(increment) ? desktopData.increment : 0
  });
  const [CardLoaderInvisible, setCardLoaderInvisible] = React.useState(true);

  const filtredCards = Boolean(loaderData) ? cards.filter((item, index) => index < LoaderData.length) : cards;
  function addCards() {
    setLoaderData({
      length: LoaderData.length + increment,
      increment
    });
  }

  React.useEffect(() => {
    setLoaderData(loaderData);
  }, [loaderData]);

  React.useEffect(() => {
    cards.length <= LoaderData.length ? setCardLoaderInvisible(true) : setCardLoaderInvisible(false);
  }, [LoaderData]);
  console.log(cards);

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
            image={cardsItem.image}
            trailerLink={cardsItem.trailerLink}
            handleCard={handleCard}
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
