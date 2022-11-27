import React from 'react';
import { NavLink } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound() {
  return (
    <section className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__text">Страница не найдена</p>
        </div>
        <footer className="not-found__footer">
          <NavLink to="/" className="not-found__link">Назад</NavLink>
        </footer>
    </section>
  );
}

export default PageNotFound;
