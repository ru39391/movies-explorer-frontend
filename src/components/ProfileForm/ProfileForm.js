import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ProfileForm({ handleForm, handleLogout, IsLoggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, email } = currentUser;
  const [ProfileFormData, setProfileFormData] = React.useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setProfileFormData({
      ...ProfileFormData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(ProfileFormData);
    handleForm(ProfileFormData);
  }

  React.useEffect(() => {
    setProfileFormData({
      name: name,
      email: email
    });
  }, [currentUser]);

  return (
    <section className="form form_type_container form_width_wide">
      <h1 className="form__title form__title_align_center form__title_margin_bottom">Привет, {name}!</h1>
      <form className="form__body" onSubmit={handleSubmit}>
        <fieldset className="form__wrapper">
          <div className="form__item form__item_type_row form__item_border_bottom">
            <label className="form__label form__label_type_nofx form__label_margin_right">Имя</label>
            <input className="form__field form__field_type_nofx form__field_width_wide" name="name" type="text" value={ProfileFormData.name || ''} onChange={handleChange} placeholder={name} />
          </div>
          <div className="form__item form__item_type_row">
            <label className="form__label form__label_type_nofx form__label_margin_right">E-mail</label>
            <input className="form__field form__field_type_nofx form__field_width_wide" name="email" type="email" value={ProfileFormData.email || ''} onChange={handleChange} placeholder={email} />
          </div>
        </fieldset>
        <div className="form__footer">
          <button className="form__button form__button_type_plain" type="submit">Редактировать</button>
          <button className="form__button form__button_type_plain form__button_color_danger" type="button" onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  );
}

export default ProfileForm;
