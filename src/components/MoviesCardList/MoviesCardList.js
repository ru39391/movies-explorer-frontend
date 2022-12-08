import React from 'react';
import Popup from '../Popup/Popup';
import MoviesCard from '../MoviesCard/MoviesCard';
import { gridParamsData } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({ cards, userCards, isNoResults, loaderData, handleCard, popupData, isPopupOpen, togglePopupVisibility }) {
  const { title, isError } = popupData;
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
    <>
      <div className={`card-list ${isNoResults && 'card-list_noresults'}`}>
        {isNoResults && 'Ничего не найдено'}
        {filtredCards.map((cardsItem, index) => (
          <MoviesCard
            card={cardsItem}
            nameRU={cardsItem.nameRU}
            duration={cardsItem.duration}
            image={cardsItem.image}
            trailerLink={cardsItem.trailerLink}
            userCards={userCards.map(item => item.movieId)}
            handleCard={handleCard}
          />
        ))}
      </div>
      <Popup popupTitle={title} isOpen={isPopupOpen} isError={isError} popupLinkTitle="" popupLinkUrl="" onHandleVisibility={togglePopupVisibility} />
    </>
  );
}

export default MoviesCardList;
