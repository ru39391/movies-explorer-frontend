import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="section">
      <h2 className="section__title section__title_border_bottom">Студент</h2>
      <article className="about">
        <div className="about__content">
          <h3 className="about__title">Виталий</h3>
          <p className="about__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about__link" href="https://github.com/ru39391">Github</a>
        </div>
        {/*
        <img className="about__picture" src="" alt="" />
        */}
      </article>
    </section>
  );
}

export default AboutMe;
