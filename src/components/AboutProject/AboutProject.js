import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about-projects" className="section wrapper">
      <h2 className="section__title section__title_border_bottom">О проекте</h2>
      <div className="about-projects">
        <div className="about-projects__content">
          <article className="about-projects__item">
            <h3 className="about-projects__title">Дипломный проект включал 5 этапов</h3>
            <p className="about-projects__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </article>
          <article className="about-projects__item">
            <h3 className="about-projects__title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-projects__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </div>
        <div className="about-projects__bottom">
          <div className="about-projects__row">
            <div className="about-projects__col about-projects__col_type_timeline">1 неделя</div>
            <div className="about-projects__col about-projects__col_width_lg about-projects__col_type_timeline about-projects__col_bg_light">4 недели</div>
          </div>
          <div className="about-projects__row">
            <div className="about-projects__col">Back-end</div>
            <div className="about-projects__col about-projects__col_width_lg">Front-end</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
