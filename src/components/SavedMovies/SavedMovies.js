import React from 'react';
import Content from '../Content/Content';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ cards, isPreloaderActive }) {
  console.log(cards);
  return (
    <Content contentClassMod="content_padding_none">
      <div className="wrapper wrapper_padding_min">
        <SearchForm />
        <Preloader isPreloaderActive={isPreloaderActive} />
        {/* <MoviesCardList cards={cards} active={true} /> */}
      </div>
    </Content>
  );
}

export default SavedMovies;
