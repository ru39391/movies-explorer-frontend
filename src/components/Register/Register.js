import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

function Register({formTitle, btnCaption, footerText, footerTitle, footerUrl}) {
  return (
    <AuthForm formTitle={formTitle} btnCaption={btnCaption} footerText={footerText} footerTitle={footerTitle} footerUrl={footerUrl}>
      <div className="form__item">
        <label className="form__label">Имя</label>
        <input className="form__field" name="name" type="text" required />
      </div>
      <div className="form__item">
        <label className="form__label">E-mail</label>
        <input className="form__field" name="email" type="email" required />
      </div>
      <div className="form__item">
        <label className="form__label">Пароль</label>
        <input className="form__field" name="password" type="password" required />
        <div className="form__error">Что-то пошло не так...</div>
      </div>
    </AuthForm>
  );
}

export default Register;
