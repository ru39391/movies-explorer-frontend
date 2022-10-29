import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="section wrapper">
      <h2 className="section__title section__title_color_light">Портфолио</h2>
      <ul className="portfolio-list">
        <li className="portfolio-list__item">
          <a className="portfolio-list__link" href="https://ru39391.github.io/mesto/">Статичный сайт</a>
        </li>
        <li className="portfolio-list__item">
          <a className="portfolio-list__link" href="https://ru39391.github.io/mesto-react/">Адаптивный сайт</a>
        </li>
        <li className="portfolio-list__item">
          <a className="portfolio-list__link" href="https://ru39391.github.io/">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
