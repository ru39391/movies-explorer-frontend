import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import PreloaderContext from '../../contexts/PreloaderContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({ cards, handlePreloaderVisibility }) {
  const { id } = React.useContext(CurrentUserContext);
  const IsPreloaderVisible = React.useContext(PreloaderContext);
  const [CardResults, setCardResults] = React.useState([]);
  const [IsNoResults, setNoResults] = React.useState(false);

  function setPreloaderInvisible() {
    handlePreloaderVisibility(false);
  };

  function searchMovies(data) {
    const { title, short } = data;
    const moviesArr = cards.filter((item) => {
      if(short) {
        return item.nameRU.toLowerCase().includes(title.toLowerCase()) && item.duration <= 40;
      } else {
        return item.nameRU.toLowerCase().includes(title.toLowerCase())
      }
    });
    if(!moviesArr.length) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    setCardResults(moviesArr);
  }

  React.useEffect(() => {
    setPreloaderInvisible(false);
  }, [CardResults]);

  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm handleForm={searchMovies} handlePreloaderVisibility={handlePreloaderVisibility} />
        {IsPreloaderVisible ? <Preloader /> : <MoviesCardList cards={CardResults} isNoResults={IsNoResults} active={false} />}
        <div className="show-more">
          <button className="show-more__btn" type="button">Ещё</button>
        </div>
      </div>
    </Content>
  );
}

export default Movies;
