import React from 'react';
import FormError from '../FormError/FormError';
import iconSearch from '../../images/icon-search.svg';
import './SearchForm.css';

function SearchForm({ btnDisabled, handleForm, handlePreloaderVisibility, movieTitle, movieShort }) {
  const [SearchFormTitle, setSearchFormTitle] = React.useState('');
  const [SearchFormShortMovie, setSearchFormShortMovie] = React.useState(false);
  const [BtnDisabled, setBtnDisabled] = React.useState(true);

  function handleChangeTitle(e) {
    const { value } = e.target;
    setSearchFormTitle(value);
    setBtnDisabled(!Boolean(value.length));
  };

  function handleChangeToggler(e) {
    const { checked } = e.target;
    setSearchFormShortMovie(checked);
  };

  function setFormData() {
    handleForm({
      title: SearchFormTitle,
      short: SearchFormShortMovie,
    });
    handlePreloaderVisibility(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormData();
  }

  React.useEffect(() => {
    setBtnDisabled(btnDisabled);
  }, [btnDisabled]);

  React.useEffect(() => {
    setSearchFormTitle(movieTitle);
    setSearchFormShortMovie(movieShort);
  }, [movieTitle, movieShort]);

  React.useEffect(() => {
    if(SearchFormTitle) {
      setFormData();
    }
  }, [SearchFormShortMovie]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__wrapper">
        <input className="search-form__field" name="title" type="text" value={SearchFormTitle || ''} onChange={handleChangeTitle} placeholder="Фильм" required />
        <button className="search-form__btn" type="submit" disabled={BtnDisabled}>
          <img src={iconSearch} alt="Поиск" />
        </button>
      </div>
      <input className="search-form__toggler" id="short" type="checkbox" name="short" onChange={handleChangeToggler} checked={SearchFormShortMovie} disabled={BtnDisabled} />
      <label className="search-form__toggler-title" for="short">Короткометражки</label>
    </form>
  );
}

export default SearchForm;
