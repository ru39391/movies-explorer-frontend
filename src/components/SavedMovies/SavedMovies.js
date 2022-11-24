import React from 'react';
import api from '../../utils/api';
import Content from '../Content/Content';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  const [Movies, setMoviesList] = React.useState([]);
  React.useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setMoviesList(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm />
        <MoviesCardList cards={Movies} active={true} />
      </div>
    </Content>
  );
}

export default SavedMovies;
