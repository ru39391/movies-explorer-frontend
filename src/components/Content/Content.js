import React from 'react';
import './Content.css';

function Content({children, contentClassMod}) {
  return (
    <main className={`content ${contentClassMod}`}>{children}</main>
  );
}

export default Content;
