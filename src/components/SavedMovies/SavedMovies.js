import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import PreloaderContext from '../../contexts/PreloaderContext';

function SavedMovies({ cards, handlePreloaderVisibility, addUserCard, removeUserCard, popupData, isPopupOpen, togglePopupVisibility }) {
  const IsPreloaderVisible = React.useContext(PreloaderContext);
  const [searchResults, setSearchResults] = React.useState({
    cards: [],
    isNoResults: false
  });

  function setPreloaderInvisible() {
    handlePreloaderVisibility(false);
  };

  function searchCards(data) {
    console.log(data);
  }

  function addCard(data) {
    addUserCard(data);
  }

  function removeCard(data) {
    removeUserCard(data);
  }

  React.useEffect(() => {
    setSearchResults({
      cards,
      isNoResults: false
    });
  }, [cards]);

  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm handleForm={searchCards} handlePreloaderVisibility={handlePreloaderVisibility} movieTitle="" movieShort={false} />
        {IsPreloaderVisible ? <Preloader /> : <MoviesCardList cards={searchResults.cards} userCards={cards} isNoResults={searchResults.isNoResults} loaderData="" addCard={addCard} removeCard={removeCard} popupData={popupData} isPopupOpen={isPopupOpen} togglePopupVisibility={togglePopupVisibility} />}
      </div>
    </Content>
  );
}

export default SavedMovies;
