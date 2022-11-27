import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="section section_bg_light">
      <div className="wrapper wrapper_padding_none">
        <h2 className="section__title section__title_border_bottom">Технологии</h2>
        <div className="techs">
          <article className="techs__content">
            <h3 className="techs__title">7 технологий</h3>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          </article>
          <ul className="techs__list">
            <li className="techs__list-item">HTML</li>
            <li className="techs__list-item">CSS</li>
            <li className="techs__list-item">JS</li>
            <li className="techs__list-item">React</li>
            <li className="techs__list-item">Git</li>
            <li className="techs__list-item">Express.js</li>
            <li className="techs__list-item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
