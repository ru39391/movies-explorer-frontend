import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className="promo wrapper">
      <div className="promo__intro">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <nav>
        <ul className="promo__list">
          <li className="promo__list-item"><a className="promo__list-link" href="#about-projects">О проекте</a></li>
          <li className="promo__list-item"><a className="promo__list-link" href="#techs">Технологии</a></li>
          <li className="promo__list-item"><a className="promo__list-link" href="#about">Студент</a></li>
        </ul>
      </nav>
    </section>
  );
}

export default Promo;
