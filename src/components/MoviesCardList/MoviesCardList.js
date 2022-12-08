import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { gridParamsData } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({ cards, isNoResults, loaderData, active }) {
  const { desktopData } = gridParamsData;
  const { increment } = loaderData;
  const [LoaderData, setLoaderData] = React.useState({
    length: desktopData.length,
    increment: desktopData.increment
  });
  const [CardLoaderInvisible, setCardLoaderInvisible] = React.useState(false);

  const filtredCards = cards.filter((item, index) => index < LoaderData.length);
  function addCards() {
    setLoaderData({
      length: LoaderData.length + increment,
      increment: increment
    });
  }

  React.useEffect(() => {
    setLoaderData(loaderData);
  }, [loaderData]);

  React.useEffect(() => {
    cards.length <= LoaderData.length ? setCardLoaderInvisible(true) : setCardLoaderInvisible(false);
  }, [LoaderData]);

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
            trailerLink={cardsItem.trailerLink}
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
