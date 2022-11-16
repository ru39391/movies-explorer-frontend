import React from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Logo.css';

function Logo() {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__picture" src={logo} alt="Учебный проект студента факультета Веб-разработки" />
    </NavLink>
  );
}

export default Logo;
