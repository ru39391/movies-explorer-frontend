import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { gridParamsData } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({ cards, isNoResults, loaderData, handleCard, active }) {
  const { desktopData } = gridParamsData;
  const [LoaderData, setLoaderData] = React.useState({
    length: desktopData.length,
    increment: desktopData.increment
  });

  const filtredCards = Boolean(loaderData) ? cards.filter((item, index) => index < LoaderData.length) : cards;

  React.useEffect(() => {
    setLoaderData(loaderData);
  }, [loaderData]);

  return (
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
  );
}

export default MoviesCardList;
