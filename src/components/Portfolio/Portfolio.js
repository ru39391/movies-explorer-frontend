import React from 'react';
import iconArrow from '../../images/icon-arrow.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="section wrapper">
      <h2 className="section__title section__title_fs_sm section__title_color_light">Портфолио</h2>
      <ul className="portfolio-list">
        <li className="portfolio-list__item">
          <a className="portfolio-list__link" href="https://ru39391.github.io/mesto/">Статичный сайт</a>
          <img className="portfolio-list__picture" src={iconArrow} alt="Статичный сайт" />
        </li>
        <li className="portfolio-list__item">
          <a className="portfolio-list__link" href="https://ru39391.github.io/mesto-react/">Адаптивный сайт</a>
          <img className="portfolio-list__picture" src={iconArrow} alt="Адаптивный сайт" />
        </li>
        <li className="portfolio-list__item">
          <a className="portfolio-list__link" href="https://ru39391.github.io/">Одностраничное приложение</a>
          <img className="portfolio-list__picture" src={iconArrow} alt="Одностраничное приложение" />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
