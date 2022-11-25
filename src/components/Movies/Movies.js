import React from 'react';
import api from '../../utils/api';
import Content from '../Content/Content';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
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
        <MoviesCardList cards={Movies} active={false} />
        <div className="show-more">
          <button className="show-more__btn" type="button">Ещё</button>
        </div>
      </div>
    </Content>
  );
}

export default Movies;
