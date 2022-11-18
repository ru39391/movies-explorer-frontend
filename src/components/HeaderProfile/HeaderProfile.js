import React from 'react';
import { NavLink } from "react-router-dom";
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

function HeaderProfile() {
  return (
    <Header>
      <div className="header__wrapper">
        <Nav className="header__nav" navClassMod="nav_type_column">
          <li className="nav__item nav__item_margin_bottom">
            <NavLink to="/movies" className="nav__link nav__link_fw_normal" activeClassName="nav__link_active">Фильмы</NavLink>
          </li>
          <li className="nav__item nav__item_margin_bottom">
            <NavLink to="/saved-movies" className="nav__link nav__link_fw_normal" activeClassName="nav__link_active">Сохранённые фильмы</NavLink>
          </li>
        </Nav>
        <NavLink to="/profile" className="header__link">Аккаунт</NavLink>
      </div>
    </Header>
  );
}

export default HeaderProfile;
