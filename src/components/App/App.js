import React from 'react';
import { NavLink, Route, Switch } from "react-router-dom";
import api from '../../utils/api';
import Header from '../Header/Header';
import HeaderProfile from '../HeaderProfile/HeaderProfile';
import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import Content from '../Content/Content';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProfileForm from '../ProfileForm/ProfileForm';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [Cards, setCardsList] = React.useState([]);
  React.useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCardsList(res);
      handlePreloaderVisibility();
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const [IsPreloaderVisible, setPreloaderInvisible] = React.useState(true);
  function handlePreloaderVisibility() {
    setPreloaderInvisible(false);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Header headerClassMod="">
          <Nav>
            <li className="nav__item"><NavLink to="/signup" className="nav__link">Регистрация</NavLink></li>
            <li className="nav__item"><NavLink to="/signin" className="nav__link nav__link_type_btn">Войти</NavLink></li>
          </Nav>
        </Header>
        <Main />
        <Footer />
      </Route>
      <Route exact path="/movies">
        <HeaderProfile />
        <Movies cards={Cards} isPreloaderActive={IsPreloaderVisible} />
        <Footer />
      </Route>
      <Route exact path="/saved-movies">
        <HeaderProfile />
        <SavedMovies cards={Cards} isPreloaderActive={IsPreloaderVisible} />
        <Footer />
      </Route>
      <Route exact path="/profile">
        <HeaderProfile />
        <Content contentClassMod="content_type_column">
          <ProfileForm />
        </Content>
      </Route>
      <Route exact path="/signup">
        <Content contentClassMod="content_type_column">
          <Register formTitle="Добро пожаловать!" btnCaption="Зарегистрироваться" footerText="Уже зарегистрированы?" footerTitle="Войти" footerUrl="signin" />
        </Content>
      </Route>
      <Route exact path="/signin">
        <Content contentClassMod="content_type_column">
          <Login formTitle="Рады видеть!" btnCaption="Войти" footerText="Ещё не зарегистрированы?" footerTitle="Регистрация" footerUrl="signup" />
        </Content>
      </Route>
      <Route path="*">
        <Content contentClassMod="content_type_column">
          <PageNotFound />
        </Content>
      </Route>
    </Switch>
  );
}

export default App;
