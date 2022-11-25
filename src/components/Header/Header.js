import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

function Header({children, headerClassMod}) {
  return (
    <header className={`header ${headerClassMod}`}>
      <Logo />
      {children}
    </header>
  );
}

export default Header;
