import React from 'react';
import { NavLink } from "react-router-dom";

function AuthFormFooter({footerText, footerTitle, footerUrl}) {
  return (
    <p className="form__info">
      <span className="form__text">{footerText}</span>
      <NavLink to={`/${footerUrl}`} className="form__link">{footerTitle}</NavLink>
    </p>
  );
}

export default AuthFormFooter;
