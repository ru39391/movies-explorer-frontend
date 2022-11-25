import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({cards, isPreloaderActive}) {
  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm />
        <Preloader isPreloaderActive={isPreloaderActive} />
        <MoviesCardList cards={cards} active={false} />
        <div className="show-more">
          <button className="show-more__btn" type="button">Ещё</button>
        </div>
      </div>
    </Content>
  );
}

export default Movies;
