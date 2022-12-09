import React from 'react';
import { useHistory } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();

  return (
    <section className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__text">Страница не найдена</p>
        </div>
        <footer className="not-found__footer">
          <button className="not-found__link" onClick={history.goBack}>Назад</button>
        </footer>
    </section>
  );
}

export default PageNotFound;
