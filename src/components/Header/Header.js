import React from 'react';
import Logo from '../Logo/Logo';
import HeaderProfile from '../HeaderProfile/HeaderProfile';
import HeaderUnauthorized from '../HeaderUnauthorized/HeaderUnauthorized';
import './Header.css';

function Header({ isLoggedIn }) {
  return (
    <header className={`header ${isLoggedIn && 'header_margin_bottom'}`}>
      <Logo />
      {isLoggedIn ? <HeaderProfile /> : <HeaderUnauthorized />}
    </header>
  );
}

export default Header;
