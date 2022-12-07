import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';
import PreloaderContext from '../../contexts/PreloaderContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({ cards, handlePreloaderVisibility }) {
  const { id } = React.useContext(CurrentUserContext);
  const IsPreloaderVisible = React.useContext(PreloaderContext);
  const moviesArr = Boolean(JSON.parse(localStorage.getItem(`movies_arr_${id}`)).length) ? JSON.parse(localStorage.getItem(`movies_arr_${id}`)) : [];

  const [CardResults, setCardResults] = React.useState(moviesArr);
  const [IsNoResults, setNoResults] = React.useState(false);

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
    const searchResultsArr = setSearchResults(data, cards, id);
    setCardResults(searchResultsArr);
    Boolean(searchResultsArr.length) ? setNoResults(false) : setNoResults(true);
  }

  React.useEffect(() => {
    setPreloaderInvisible(false);
  }, [CardResults]);

  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm handleForm={searchMovies} handlePreloaderVisibility={handlePreloaderVisibility} userId={id} />
        {IsPreloaderVisible ? <Preloader /> : <MoviesCardList cards={CardResults} isNoResults={moviesArr.length} active={false} />}
        <div className="show-more">
          <button className="show-more__btn" type="button">Ещё</button>
        </div>
      </div>
    </Content>
  );
}

export default Movies;
