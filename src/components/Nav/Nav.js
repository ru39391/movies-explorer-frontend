import React from 'react';
import './Nav.css';

function Nav({children, className, navClassMod}) {
  return (
    <nav className={className}>
      <ul className={`nav ${navClassMod}`}>
        {children}
      </ul>
    </nav>
  );
}

export default Nav;
