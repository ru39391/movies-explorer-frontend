import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className="promo wrapper">
      <div className="promo__intro">
        <h1>Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <nav>
        <ul className="promo__list">
          <li><a className="promo__list-item" href="#about-projects">О проекте</a></li>
          <li><a className="promo__list-item" href="#techs">Технологии</a></li>
          <li><a className="promo__list-item" href="#about">Студент</a></li>
        </ul>
      </nav>
    </section>
  );
}

export default Promo;
