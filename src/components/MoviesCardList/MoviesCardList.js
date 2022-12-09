import React from 'react';
import Popup from '../Popup/Popup';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesListConfig, gridParams } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({ cards, userCards, isNoResults, loaderData, addCard, removeCard, popupData, isPopupOpen, togglePopupVisibility }) {
  const { warningMess } = moviesListConfig;
  const { title, isError } = popupData;
  const { desktopData } = gridParams;
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
        {isNoResults && warningMess}
        {filtredCards.map((cardsItem, index) => (
          <MoviesCard
            key={Boolean(cardsItem.movieId) ? cardsItem.movieId : cardsItem.id}
            card={cardsItem}
            nameRU={cardsItem.nameRU}
            duration={cardsItem.duration}
            image={cardsItem.image}
            trailerLink={cardsItem.trailerLink}
            userCards={userCards}
            userCardIds={userCards.map(item => item.movieId)}
            addCard={addCard}
            removeCard={removeCard}
          />
        ))}
      </div>
      <Popup popupTitle={title} isOpen={isPopupOpen} isError={isError} popupLinkTitle="" popupLinkUrl="" onHandleVisibility={togglePopupVisibility} />
    </>
  );
}

export default MoviesCardList;
