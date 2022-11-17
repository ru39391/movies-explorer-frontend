import React from 'react';
import { NavLink, Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
//import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Header>
          <Logo />
          <Nav>
            <li className="nav__item"><NavLink to="/signup" className="nav__link">Регистрация</NavLink></li>
            <li className="nav__item"><NavLink to="/signin" className="nav__link nav__link_type_btn">Войти</NavLink></li>
          </Nav>
        </Header>
        <Main>
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </Main>
        <Footer />
      </Route>
      <Route exact path="/movies">
        <Header>
          <nav>
            <ul className="nav">
              <li><a href="#" className="nav__link">Фильмы</a></li>
              <li><a href="#" className="nav__link">Сохранённые фильмы</a></li>
            </ul>
          </nav>
          <nav>
            <ul className="nav">
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
        <Register formTitle="Добро пожаловать!" btnCaption="Зарегистрироваться" footerText="Уже зарегистрированы?" footerTitle="Войти" footerUrl="signin" />
      </Route>
      <Route exact path="/signin">
        <Login formTitle="Рады видеть!" btnCaption="Войти" footerText="Ещё не зарегистрированы?" footerTitle="Регистрация" footerUrl="signup" />
      </Route>
    </Switch>
  );
}

export default App;
