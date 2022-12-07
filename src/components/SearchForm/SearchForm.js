import React from 'react';
import iconSearch from '../../images/icon-search.svg';
import './SearchForm.css';

function SearchForm({ handleForm, handlePreloaderVisibility, userId }) {
  const movieTitle = Boolean(localStorage.getItem(`movies_title_${userId}`)) ? localStorage.getItem(`movies_title_${userId}`) : '';
  const movieShort = localStorage.getItem(`movies_short_${userId}`) ? JSON.parse(localStorage.getItem(`movies_short_${userId}`)) : false;

  const [SearchFormTitle, setSearchFormTitle] = React.useState(movieTitle);
  const [SearchFormShortMovie, setSearchFormShortMovie] = React.useState(movieShort);

  function handleChangeTitle(e) {
    const { value } = e.target;
    setSearchFormTitle(value);
    localStorage.setItem(`movies_title_${userId}`, value);
  };

  function handleChangeToggler(e) {
    const { checked } = e.target;
    setSearchFormShortMovie(checked);
    localStorage.setItem(`movies_short_${userId}`, checked);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleForm({
      title: SearchFormTitle,
      short: SearchFormShortMovie,
    });
    handlePreloaderVisibility(true);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__wrapper">
        <input className="search-form__field" name="title" type="text" value={SearchFormTitle || ''} onChange={handleChangeTitle} placeholder="Фильм" required />
        <button className="search-form__btn" type="submit">
          <img src={iconSearch} alt="Поиск" />
        </button>
      </div>
      <input className="search-form__toggler" id="short" type="checkbox" name="short" onChange={handleChangeToggler} checked={SearchFormShortMovie} />
      <label className="search-form__toggler-title" for="short">Короткометражки</label>
    </form>
  );
}

export default SearchForm;
