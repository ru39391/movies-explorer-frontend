import React from 'react';
import { NavLink } from "react-router-dom";
import HeaderBtn from '../HeaderBtn/HeaderBtn';
import Nav from '../Nav/Nav';
import iconNav from '../../images/icon-nav.svg';
import iconClose from '../../images/icon-close.svg';

function HeaderProfile() {
  const [IsNavActive, setNavActive] = React.useState(false);
  function toggleNavClick() {
    if(IsNavActive) {
      setNavActive(false);
    } else {
      setNavActive(true);
    }
  };

  return (
    <>
      <HeaderBtn headerBtnClassMod="" headerBtnIcon={iconNav} headerBtnTitle="Показать меню" onHandleNavActive={toggleNavClick} />
      <div className={`header__wrapper ${IsNavActive && 'header__wrapper_active'}`}>
        <HeaderBtn headerBtnClassMod="header__btn_type_close" headerBtnIcon={iconClose} headerBtnTitle="Закрыть меню" onHandleNavActive={toggleNavClick} />
        <Nav className="header__nav" navClassMod="nav_type_column">
          <li className="nav__item nav__item_linkto_main nav__item_margin_bottom">
            <NavLink to="/" className="nav__link nav__link_menu_profile">Главная</NavLink>
          </li>
          <li className="nav__item nav__item_margin_bottom">
            <NavLink to="/movies" className="nav__link nav__link_menu_profile" activeClassName="nav__link_active" onClick={toggleNavClick}>Фильмы</NavLink>
          </li>
          <li className="nav__item nav__item_margin_bottom">
            <NavLink to="/saved-movies" className="nav__link nav__link_menu_profile" activeClassName="nav__link_active" onClick={toggleNavClick}>Сохранённые фильмы</NavLink>
          </li>
        </Nav>
        <NavLink to="/profile" className="header__link" onClick={toggleNavClick}>Аккаунт</NavLink>
      </div>
    </>
  );
}

export default HeaderProfile;
