import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION, breakPointsData, gridParamsData } from '../../utils/constants';
import PreloaderContext from '../../contexts/PreloaderContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({ cards, IsLoggedIn, handlePreloaderVisibility }) {
  const currentUserId = React.useContext(CurrentUserContext).id;
  const IsPreloaderVisible = React.useContext(PreloaderContext);

  const { desktopPoint, tabletPoint, mobilePoint } = breakPointsData;
  const { desktopData, tabletData, mobileData } = gridParamsData;
  const savedMoviesArr = JSON.parse(localStorage.getItem(`movies_arr_${currentUserId}`));

  const [CardLoaderParams, setCardLoaderParams] = React.useState(desktopData);
  const [DocumentWidth, setDocumentWidth] = React.useState(document.body.scrollWidth);
  const [MoviesResults, setMoviesResults] = React.useState(Boolean(savedMoviesArr) ? savedMoviesArr : []);
  const [IsNoResults, setNoResults] = React.useState(Array.isArray(savedMoviesArr) && !savedMoviesArr.length);

  function handleResize() {
    setTimeout(() => {
        setDocumentWidth(document.body.scrollWidth);

        if(DocumentWidth > desktopPoint) {
          setCardLoaderParams(desktopData);
        }
    
        if(DocumentWidth > mobilePoint && DocumentWidth <= tabletPoint) {
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

  function saveSearchResults(userId, arr) {
    localStorage.setItem(`movies_arr_${userId}`, JSON.stringify(arr));
  };

  function setSearchResults(data, arr, userId) {
    const { title, short } = data;
    const searchResultsArr = short ? getMoviesByDuration(short, getMoviesByTitle(title, arr)) : getMoviesByTitle(title, arr);
    saveSearchResults(userId, searchResultsArr);
    return JSON.parse(localStorage.getItem(`movies_arr_${userId}`));
  }

  function searchMovies(data) {
    const searchResultsArr = setSearchResults(data, cards, currentUserId);
    setMoviesResults(searchResultsArr);
    Boolean(searchResultsArr.length) ? setNoResults(false) : setNoResults(true);
  }

  React.useEffect(() => {
    setPreloaderInvisible(false);
  }, [MoviesResults]);

  React.useEffect(() => {
    handleResize();
  }, [DocumentWidth]);

  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm handleForm={searchMovies} handlePreloaderVisibility={handlePreloaderVisibility} userId={currentUserId} />
        {IsPreloaderVisible ? <Preloader /> : <MoviesCardList cards={MoviesResults} isNoResults={IsNoResults} length={CardLoaderParams.length} increment={CardLoaderParams.increment} active={false} />}
      </div>
    </Content>
  );
}

export default Movies;
