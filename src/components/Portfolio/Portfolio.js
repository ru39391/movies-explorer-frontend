import React from 'react';
import iconArrow from '../../images/icon-arrow.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="section wrapper">
      <h2 className="section__title section__title_fs_sm section__title_color_light">Портфолио</h2>
      <div className="portfolio-list">
        <a className="portfolio-list__link" href="https://ru39391.github.io/mesto/" target="_blank" rel="noopener noreferrer">
          <span className="portfolio-list__text">Статичный сайт</span>
          <img className="portfolio-list__picture" src={iconArrow} alt="Статичный сайт" />
        </a>
        <a className="portfolio-list__link" href="https://ru39391.github.io/mesto-react/" target="_blank" rel="noopener noreferrer">
          <span className="portfolio-list__text">Адаптивный сайт</span>
          <img className="portfolio-list__picture" src={iconArrow} alt="Адаптивный сайт" />
        </a>
        <a className="portfolio-list__link" href="https://ru39391-d.students.nomoredomains.icu/" target="_blank" rel="noopener noreferrer">
          <span className="portfolio-list__text">Одностраничное приложение</span>
          <img className="portfolio-list__picture" src={iconArrow} alt="Одностраничное приложение" />
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
