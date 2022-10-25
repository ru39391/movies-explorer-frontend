import React from 'react';
import { NavLink, Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
//import ProtectedRoute from './ProtectedRoute';

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        index
      </Route>
      <Route exact path="/movies">
        movies
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
      <Footer />
    </Switch>
  );
}

export default App;
