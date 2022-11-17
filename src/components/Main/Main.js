import React from 'react';
import './Main.css';

function Main({children}) {
  return (
    <main className="content">{children}</main>
  );
}

export default Main;