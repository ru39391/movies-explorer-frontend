import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper wrapper_padding_none">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__bottom">
          <p className="footer__copyright">&copy; 2020</p>
          <nav>
            <ul className="footer__nav">
              <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.ru/web/">Яндекс.Практикум</a></li>
              <li className="footer__item"><a className="footer__link" href="https://github.com/ru39391">Github</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
