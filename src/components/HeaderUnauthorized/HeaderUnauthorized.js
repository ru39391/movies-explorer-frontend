import React from 'react';
import { NavLink } from "react-router-dom";
import Nav from '../Nav/Nav';

function HeaderUnauthorized() {
  return (
    <Nav>
      <li className="nav__item"><NavLink to="/signup" className="nav__link">Регистрация</NavLink></li>
      <li className="nav__item"><NavLink to="/signin" className="nav__link nav__link_type_btn">Войти</NavLink></li>
    </Nav>
  );
}

export default HeaderUnauthorized;
