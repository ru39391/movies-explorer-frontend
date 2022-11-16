import React from 'react';
import './Nav.css';

function Nav({children}) {
  return (
    <nav>
      <ul className="nav">
        {children}
      </ul>
    </nav>
  );
}

export default Nav;
