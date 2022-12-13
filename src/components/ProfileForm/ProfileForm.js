import React from 'react';
import Popup from '../Popup/Popup';
import FormError from '../FormError/FormError';
import { validationParams, validationMessData } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ProfileForm({ handleForm, handleLogout, popupData, isPopupOpen, togglePopupVisibility }) {
  const { title, isError } = popupData;
  const currentUser = React.useContext(CurrentUserContext);
  const { name, email } = currentUser;
  
  const [BtnDisabled, setBtnDisabled] = React.useState(true);
  const [ProfileFormData, setProfileFormData] = React.useState({});
  const [FormErrorsData, setFormErrorsData] = React.useState({});

  const inputValidators = {
    name: (value) => {
      if(value) {
        return validationParams.name.test(value);
      }
      return;
    },
    email: (value) => {
      if(value) {
        return validationParams.email.test(value);
      }
      return;
    },
  }

  function validateInputs(data) {
    const inputData = {};
    const dataArr = Object.keys(data);
    for(let i = 0; i < dataArr.length; i++) {
      inputData[dataArr[i]] = inputValidators[dataArr[i]](data[dataArr[i]]);
    }
    setFormErrorsData(inputData);
    return inputData;
  }

  function validateFormData(data) {
    const inputArr = Object.values(validateInputs(data));
    if(inputArr.length === Object.keys(inputValidators).length && inputArr.every(item => Boolean(item))) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProfileFormData({
      ...ProfileFormData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setBtnDisabled(true);
    handleForm(ProfileFormData);
  }

  React.useEffect(() => {
    setProfileFormData({ name, email });
  }, [name, email]);

  React.useEffect(() => {
    validateFormData(ProfileFormData);
    if(ProfileFormData.name === name && ProfileFormData.email === email) {
      setBtnDisabled(true);
    }
  }, [ProfileFormData]);

  return (
    <>
      <section className="form form_type_container form_width_wide">
        <h1 className="form__title form__title_align_center form__title_margin_bottom">Привет, {name}!</h1>
        <form className="form__body" onSubmit={handleSubmit}>
          <fieldset className="form__wrapper">
            <div className="form__item form__item_type_row form__item_border_bottom">
              <label className="form__label form__label_type_nofx form__label_margin_right">Имя</label>
              <input className="form__field form__field_type_nofx form__field_width_wide" name="name" type="text" value={ProfileFormData.name || ''} onChange={handleChange} placeholder={name} />
            </div>
            {ProfileFormData.name && !FormErrorsData.name && <FormError errorText={validationMessData.name} classMod="form__error_margin_bottom" />}
            <div className="form__item form__item_type_row form__item_border_bottom">
              <label className="form__label form__label_type_nofx form__label_margin_right">E-mail</label>
              <input className="form__field form__field_type_nofx form__field_width_wide" name="email" type="email" value={ProfileFormData.email || ''} onChange={handleChange} placeholder={email} />
            </div>
            {ProfileFormData.email && !FormErrorsData.email && <FormError errorText={validationMessData.email} classMod="form__error_margin_bottom" />}
          </fieldset>
          <div className="form__footer">
            <button className="form__button form__button_type_plain" type="submit" disabled={BtnDisabled}>Редактировать</button>
            <button className="form__button form__button_type_plain form__button_color_danger" type="button" onClick={handleLogout}>Выйти из аккаунта</button>
          </div>
        </form>
      </section>
      <Popup popupTitle={title} isOpen={isPopupOpen} isError={isError} onHandleVisibility={togglePopupVisibility} />
    </>
  );
}

export default ProfileForm;
