import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION, breakPointsData, gridParamsData } from '../../utils/constants';
import PreloaderContext from '../../contexts/PreloaderContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({ cards, userCards, handlePreloaderVisibility, addUserCard, removeUserCard, popupData, isPopupOpen, togglePopupVisibility }) {
  const currentUserId = React.useContext(CurrentUserContext).id;
  const IsPreloaderVisible = React.useContext(PreloaderContext);

  const { desktopPoint, mobilePoint } = breakPointsData;
  const { desktopData, tabletData, mobileData } = gridParamsData;  

  const [IsNoResults, setNoResults] = React.useState(false);
  const [CardLoaderInvisible, setCardLoaderInvisible] = React.useState(true);
  const [CardLoaderParams, setCardLoaderParams] = React.useState(desktopData);
  const [DocumentWidth, setDocumentWidth] = React.useState(document.body.scrollWidth);
  const [CurrentUserSearchResults, setCurrentUserSearchResults] = React.useState({
    title: '',
    short: false,
    movies: [],
  });

  function checkParam(param, defaultValue) {
    return Boolean(param) ? param : defaultValue;
  }
  
  function checkLocalParams(userId) {
    const localMoviesArr = JSON.parse(localStorage.getItem(`movies_arr_${userId}`));
    const localStorageData = {
      title: checkParam(localStorage.getItem(`movies_title_${userId}`), CurrentUserSearchResults.title),
      short: checkParam(JSON.parse(localStorage.getItem(`movies_short_${userId}`)), CurrentUserSearchResults.short),
      movies: checkParam(localMoviesArr, CurrentUserSearchResults.movies)
    }
    setCurrentUserSearchResults(localStorageData);
    setNoResults(Array.isArray(localMoviesArr) && !localMoviesArr.length);
  }

  function handleResize() {
    setTimeout(() => {
        setDocumentWidth(document.body.scrollWidth);

        if(DocumentWidth > desktopPoint) {
          setCardLoaderParams(desktopData);
        }
    
        if(DocumentWidth > mobilePoint && DocumentWidth <= desktopPoint) {
          setCardLoaderParams(tabletData);
        }
    
        if(DocumentWidth <= mobilePoint) {
          setCardLoaderParams(mobileData);
        }
    }, 250);
  }
  window.addEventListener('resize', handleResize);

  function setPreloaderInvisible() {
    handlePreloaderVisibility(false);
  };

  function getMoviesByTitle(value, arr) {
    return arr.filter(item => item.nameRU.toLowerCase().includes(value.toLowerCase()));
  };

  function getMoviesByDuration(value, arr) {
    return value ? arr.filter(item => item.duration <= SHORT_MOVIE_DURATION) : arr;
  };

  function saveSearchResults(userId, value, checked, arr) {
    localStorage.setItem(`movies_title_${userId}`, value);
    localStorage.setItem(`movies_short_${userId}`, checked);
    localStorage.setItem(`movies_arr_${userId}`, JSON.stringify(arr));
    return {
      title: localStorage.getItem(`movies_title_${userId}`),
      short: JSON.parse(localStorage.getItem(`movies_short_${userId}`)),
      movies: JSON.parse(localStorage.getItem(`movies_arr_${userId}`)),
    };
  };

  function setSearchResults(data, arr, userId) {
    const { title, short } = data;
    const searchResultsArr = short ? getMoviesByDuration(short, getMoviesByTitle(title, arr)) : getMoviesByTitle(title, arr);
    return saveSearchResults(userId, title, short, searchResultsArr);
  }

  function searchMovies(data) {
    const { title, short, movies } = setSearchResults(data, cards, currentUserId);
    setCurrentUserSearchResults({ title, short, movies });
    Boolean(movies.length) ? setNoResults(false) : setNoResults(true);
  }

  function addCards() {
    setCardLoaderParams({
      length: CardLoaderParams.length + CardLoaderParams.increment,
      increment: CardLoaderParams.increment
    });
  }

  function addCard(data) {
    addUserCard(data);
  }

  function removeCard(data) {
    removeUserCard(data);
  }

  React.useEffect(() => {
    setPreloaderInvisible();
  }, [CurrentUserSearchResults.movies]);

  React.useEffect(() => {
    CurrentUserSearchResults.movies.length <= CardLoaderParams.length ? setCardLoaderInvisible(true) : setCardLoaderInvisible(false);
  }, [CardLoaderParams, CurrentUserSearchResults.movies]);

  React.useEffect(() => {
    handleResize();
  }, [DocumentWidth]);

  React.useEffect(() => {
    checkLocalParams(currentUserId);
  }, [currentUserId]);

  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm handleForm={searchMovies} handlePreloaderVisibility={handlePreloaderVisibility} movieTitle={CurrentUserSearchResults.title} movieShort={CurrentUserSearchResults.short} />
        {IsPreloaderVisible ? <Preloader /> : <MoviesCardList cards={CurrentUserSearchResults.movies} userCards={userCards} isNoResults={IsNoResults} loaderData={CardLoaderParams} addCard={addCard} removeCard={removeCard} popupData={popupData} isPopupOpen={isPopupOpen} togglePopupVisibility={togglePopupVisibility} />}
        <div className={`show-more ${CardLoaderInvisible && 'show-more_invisible'}`}>
          <button className="show-more__btn" type="button" onClick={addCards}>Ещё</button>
        </div>
      </div>
    </Content>
  );
}

export default Movies;
