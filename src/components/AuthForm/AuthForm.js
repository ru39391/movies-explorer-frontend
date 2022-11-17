import React from 'react';
import Logo from '../Logo/Logo';
import AuthFormFooter from '../AuthFormFooter/AuthFormFooter';
import './AuthForm.css';

function AuthForm({children, formTitle, btnCaption, footerText, footerTitle, footerUrl}) {
  return (
    <section className="form form_container">
      <header className="form__header">
        <Logo />
      </header>
      <h1 className="form__title">{formTitle}</h1>
      <form className="form__body">
        <fieldset className="form__wrapper">{children}</fieldset>
        <div className="form__footer">
          <button className="form__button" type="submit">{btnCaption}</button>
          <AuthFormFooter footerText={footerText} footerTitle={footerTitle} footerUrl={footerUrl} />
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
