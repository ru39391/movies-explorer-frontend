import React from 'react';
import './Header.css';

function Header({children}) {
  return (
    <header className="header">{children}</header>
  );
}

export default Header;
