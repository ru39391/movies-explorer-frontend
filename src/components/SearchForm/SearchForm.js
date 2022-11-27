import React from 'react';
import iconSearch from '../../images/icon-search.svg';
import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form" action="#">
      <div className="search-form__wrapper">
        <input className="search-form__field" name="search" type="text" placeholder="Фильм" required />
        <button className="search-form__btn" type="submit">
          <img src={iconSearch} alt="Поиск" />
        </button>
      </div>
      <input className="search-form__toggler" id="short" name="short" type="checkbox" />
      <label className="search-form__toggler-title" for="short">Короткометражки</label>
    </form>
  );
}

export default SearchForm;
