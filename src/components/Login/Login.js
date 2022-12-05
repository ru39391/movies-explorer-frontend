import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ formTitle, btnCaption, footerText, footerTitle, footerUrl, handleForm, popupData, isPopupOpen, togglePopupVisibility }) {
  const [LoginFormData, setLoginFormData] = React.useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData({
      ...LoginFormData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(LoginFormData);
    handleForm(LoginFormData);
  } 

  React.useEffect(() => {
    setLoginFormData({});
  }, []);

  return (
    <AuthForm formTitle={formTitle} btnCaption={btnCaption} footerText={footerText} footerTitle={footerTitle} footerUrl={footerUrl} onSubmit={handleSubmit} popupData={popupData} isPopupOpen={isPopupOpen} togglePopupVisibility={togglePopupVisibility}>
      <div className="form__item">
        <label className="form__label">E-mail</label>
        <input className="form__field" name="email" type="email" value={LoginFormData.email || ''} onChange={handleChange} required />
      </div>
      <div className="form__item">
        <label className="form__label">Пароль</label>
        <input className="form__field" name="password" type="password" value={LoginFormData.password || ''} onChange={handleChange} required />
        <div className="form__error">Что-то пошло не так...</div>
      </div>
    </AuthForm>
  );
}

export default Login;
