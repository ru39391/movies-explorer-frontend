import React from 'react';
import { NavLink, Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
//import ProtectedRoute from './ProtectedRoute';

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Header>
          <nav>
            <ul class="nav">
              <li><NavLink to="/signup" className="nav__link">Регистрация</NavLink></li>
              <li><NavLink to="/signin" className="nav__link nav__link_type_btn">Войти</NavLink></li>
            </ul>
          </nav>
        </Header>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </Route>
      <Route exact path="/movies">
        <Header>
          <nav>
            <ul class="nav">
              <li><a href="#" className="nav__link">Фильмы</a></li>
              <li><a href="#" className="nav__link">Сохранённые фильмы</a></li>
            </ul>
          </nav>
          <nav>
            <ul class="nav">
              <li><NavLink to="/signup" className="nav__link">Регистрация</NavLink></li>
              <li><NavLink to="/signin" className="nav__link nav__link_type_btn">Войти</NavLink></li>
            </ul>
          </nav>
        </Header>
        <Footer />
      </Route>
      <Route exact path="/saved-movies">
        saved-movies
      </Route>
      <Route exact path="/profile">
        profile
      </Route>
      <Route exact path="/signup">
        signup
        <NavLink to="/signin" className="header__link">Войти</NavLink>
      </Route>
      <Route exact path="/signin">
        signin
        <NavLink to="/signup" className="header__link">Регистрация</NavLink>
      </Route>
    </Switch>
  );
}

export default App;
