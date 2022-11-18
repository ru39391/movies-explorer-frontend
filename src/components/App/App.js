import React from 'react';
import { NavLink, Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from '../Header/Header';
import HeaderProfile from '../HeaderProfile/HeaderProfile';
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
        <HeaderProfile />
        <Footer />
      </Route>
      <Route exact path="/saved-movies">
        <HeaderProfile />
      </Route>
      <Route exact path="/profile">
        <HeaderProfile />
      </Route>
      <Route exact path="/signup">
        <div className="page__wrapper">
          <Register formTitle="Добро пожаловать!" btnCaption="Зарегистрироваться" footerText="Уже зарегистрированы?" footerTitle="Войти" footerUrl="signin" />
        </div>
      </Route>
      <Route exact path="/signin">
        <div className="page__wrapper">
          <Login formTitle="Рады видеть!" btnCaption="Войти" footerText="Ещё не зарегистрированы?" footerTitle="Регистрация" footerUrl="signup" />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
