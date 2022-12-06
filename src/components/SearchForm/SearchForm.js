import React from 'react';
import iconSearch from '../../images/icon-search.svg';
import './SearchForm.css';

function SearchForm({ handleForm, handlePreloaderVisibility }) {
  const [SearchFormTitle, setSearchFormTitle] = React.useState(localStorage.getItem('searchFormTitle'));
  const [SearchFormToggler, setSearchFormToggler] = React.useState(Boolean(localStorage.getItem('searchFormToggler')));

  function handleChangeTitle(e) {
    const { value } = e.target;
    setSearchFormTitle(value);
  };

  function handleChangeToggler(e) {
    const { checked } = e.target;
    setSearchFormToggler(checked);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleForm({
      title: SearchFormTitle,
      short: SearchFormToggler,
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
      <input className="search-form__toggler" id="short" name="short" value={SearchFormToggler || ''} onChange={handleChangeToggler} type="checkbox" />
      <label className="search-form__toggler-title" for="short">Короткометражки</label>
    </form>
  );
}

export default SearchForm;
