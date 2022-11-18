import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

function Header({children}) {
  return (
    <header className="header">
      <Logo />
      {children}
    </header>
  );
}

export default Header;
