import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ formTitle, btnCaption, footerText, footerTitle, footerUrl, popupData, isPopupOpen, togglePopupVisibility, handleForm }) {
  const { isError } = popupData;
  const [RegisterFormData, setRegisterFormData] = React.useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterFormData({
      ...RegisterFormData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleForm(RegisterFormData);
  }

  React.useEffect(() => {
    if(!isError) {
      setRegisterFormData({});
    }
  }, [isError]);

  return (
    <AuthForm formTitle={formTitle} btnCaption={btnCaption} footerText={footerText} footerTitle={footerTitle} footerUrl={footerUrl} popupData={popupData} isPopupOpen={isPopupOpen} togglePopupVisibility={togglePopupVisibility} onSubmit={handleSubmit} >
      <div className="form__item">
        <label className="form__label">Имя</label>
        <input className="form__field" name="name" type="text" value={RegisterFormData.name || ''} onChange={handleChange} required />
      </div>
      <div className="form__item">
        <label className="form__label">E-mail</label>
        <input className="form__field" name="email" type="email" value={RegisterFormData.email || ''} onChange={handleChange} required />
      </div>
      <div className="form__item">
        <label className="form__label">Пароль</label>
        <input className="form__field" name="password" type="password" value={RegisterFormData.password || ''} onChange={handleChange} required />
        <div className="form__error">Что-то пошло не так...</div>
      </div>
    </AuthForm>
  );
}

export default Register;
