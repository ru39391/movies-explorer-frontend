import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';
import PreloaderContext from '../../contexts/PreloaderContext';

function SavedMovies({ cards, handlePreloaderVisibility, addUserCard, removeUserCard, popupData, isPopupOpen, togglePopupVisibility }) {
  const IsPreloaderVisible = React.useContext(PreloaderContext);
  const [CurrentSearchResults, setCurrentSearchResults] = React.useState({
    cards: cards,
    isNoResults: false
  });

  function setPreloaderInvisible() {
    handlePreloaderVisibility(false);
  };

  function getMoviesByTitle(value, arr) {
    return arr.filter(item => item.nameRU.toLowerCase().includes(value.toLowerCase()));
  };

  function getMoviesByDuration(value, arr) {
    return value ? arr.filter(item => item.duration <= SHORT_MOVIE_DURATION) : arr;
  };

  function setSearchResults(data, arr) {
    const { title, short } = data;
    const searchResultsArr = short ? getMoviesByDuration(short, getMoviesByTitle(title, arr)) : getMoviesByTitle(title, arr);
    return searchResultsArr;
  }

  function searchCards(data) {
    const currentCards = setSearchResults(data, cards);
    setCurrentSearchResults({
      cards: currentCards,
      isNoResults: Boolean(currentCards.length) ? false : true,
    });
  }

  function addCard(data) {
    addUserCard(data);
  }

  function removeCard(data) {
    removeUserCard(data);
  }

  React.useEffect(() => {
    setCurrentSearchResults({
      cards: cards,
      isNoResults: Boolean(cards.length) ? false : true,
    });
  }, [cards]);

  React.useEffect(() => {
    setPreloaderInvisible();
  }, [CurrentSearchResults]);

  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm btnDisabled={true} handleForm={searchCards} handlePreloaderVisibility={handlePreloaderVisibility} movieTitle="" movieShort={false} />
        {IsPreloaderVisible ? <Preloader /> : <MoviesCardList cards={CurrentSearchResults.cards} userCards={cards} isNoResults={CurrentSearchResults.isNoResults} loaderData="" addCard={addCard} removeCard={removeCard} popupData={popupData} isPopupOpen={isPopupOpen} togglePopupVisibility={togglePopupVisibility} />}
      </div>
    </Content>
  );
}

export default SavedMovies;
