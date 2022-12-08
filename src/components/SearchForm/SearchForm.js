import React from 'react';
import iconSearch from '../../images/icon-search.svg';
import './SearchForm.css';

function SearchForm({ handleForm, handlePreloaderVisibility, movieTitle, movieShort }) {
  const [SearchFormTitle, setSearchFormTitle] = React.useState('');
  const [SearchFormShortMovie, setSearchFormShortMovie] = React.useState(false);

  function handleChangeTitle(e) {
    const { value } = e.target;
    setSearchFormTitle(value);
  };

  function handleChangeToggler(e) {
    const { checked } = e.target;
    setSearchFormShortMovie(checked);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleForm({
      title: SearchFormTitle,
      short: SearchFormShortMovie,
    });
    handlePreloaderVisibility(true);
  }

  React.useEffect(() => {
    setSearchFormTitle(movieTitle);
    setSearchFormShortMovie(movieShort);
  }, [movieTitle, movieShort]);

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
