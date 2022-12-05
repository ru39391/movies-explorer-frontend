import React from 'react';
import { NavLink, Route, Switch, useHistory, Redirect } from "react-router-dom";

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

import api from '../../utils/api';
import auth from '../../utils/auth';
import { signupConfig, signinConfig } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const [CurrentUser, setCurrentUser] = React.useState({
    id: null,
    name: '',
    email: ''
  });

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

  /* popup params */
  const [PopupData, setPopupData] = React.useState({
    isError: false,
    title: ''
  });
  const [IsPopupOpen, setPopupVisibility] = React.useState(false);

  /* popup handlers */
  function setPopupParams(data) {
    setPopupData(data);
  }

  function redirectToSignin(data) {
    if(data.className === 'success') {
      history.push('/signin');
    }
  }

  function togglePopupVisibility() {
    if(IsPopupOpen) {
      setPopupVisibility(false);
    } else {
      setPopupVisibility(true);
    }
  }

  /* logged status params */
  const [IsLoggedIn, setLoggedIn] = React.useState(false);
  function handleLoggedIn() {
    setLoggedIn(true);
  };

  const [UserData, setUserData] = React.useState({});
  function handleUserData(data) {
    setUserData(data);
  };

  function signUp(data) {
    auth.authUser(data, signupConfig)
      .then(res => {
        console.log(res);
        const { succesMess } = signupConfig;
        setPopupParams({
          isError: false,
          title: succesMess
        });
        togglePopupVisibility();
      })
      .catch(err => {
        console.log(err);
        const { status } = err;
        const { conflictErrorMess, validationErrorMess } = signupConfig;
        setPopupParams({
          isError: true,
          title: status === 409 ? conflictErrorMess : validationErrorMess,
        });
        togglePopupVisibility();
      });
  }

  function signIn(data) {
    auth.authUser(data, signinConfig)
      .then(res => {
        console.log(res);
        if(res.token) {
          const { token } = res;
          localStorage.setItem('token', token);
          handleLoggedIn();
          history.push('/profile');
        }
      })
      .catch(err => {
        console.log(err);
        setPopupParams({
          isError: true,
          title: 'error'
        });
        togglePopupVisibility();
      });
  }

  function signOut(){
    localStorage.removeItem('token');
    history.push('/signin');
  }

  function checkToken() {
    const jwt = localStorage.getItem('token');
    console.log(jwt);
    if(jwt) {
      auth.getUserToken(jwt)
        .then(res => {
          console.log(res.data);
          const {_id, email} = res.data;
          handleUserData({
            id: _id,
            email: email
          });
          handleLoggedIn();
          history.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, [IsLoggedIn]);

  return (
    <CurrentUserContext.Provider value={CurrentUser}>
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
        <ProtectedRoute exact path="/movies" isLoggedIn={IsLoggedIn}>
          <HeaderProfile />
          <Movies cards={Cards} isPreloaderActive={IsPreloaderVisible} />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" isLoggedIn={IsLoggedIn}>
          <HeaderProfile />
          <SavedMovies cards={Cards} isPreloaderActive={IsPreloaderVisible} />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" isLoggedIn={IsLoggedIn}>
          <HeaderProfile />
          <Content contentClassMod="content_type_column">
            <ProfileForm />
          </Content>
        </ProtectedRoute>
        <Route exact path="/signup">
          <Content contentClassMod="content_type_column">
            <Register formTitle="Добро пожаловать!" btnCaption="Зарегистрироваться" footerText="Уже зарегистрированы?" footerTitle="Войти" footerUrl="signin" handleForm={signUp} popupData={PopupData} isPopupOpen={IsPopupOpen} togglePopupVisibility={togglePopupVisibility} />
          </Content>
        </Route>
        <Route exact path="/signin">
          <Content contentClassMod="content_type_column">
            <Login formTitle="Рады видеть!" btnCaption="Войти" footerText="Ещё не зарегистрированы?" footerTitle="Регистрация" footerUrl="signup" handleForm={signIn} popupData={PopupData} isPopupOpen={IsPopupOpen} togglePopupVisibility={togglePopupVisibility} />
          </Content>
        </Route>
        <Route path="*">
          <Content contentClassMod="content_type_column">
            <PageNotFound />
          </Content>
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
