import React from 'react';
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Content from '../Content/Content';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProfileForm from '../ProfileForm/ProfileForm';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { CONFLICT_ERROR_CODE, signupConfig, signinConfig, profileEditConfig, moviesListConfig } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PreloaderContext from '../../contexts/PreloaderContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const location = useLocation();

  const [MoviesList, setMoviesList] = React.useState([]);
  const [CurrentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    moviesApi.getInitialMovies()
    .then((res) => {
      setMoviesList(res);
    })
    .catch((err) => {
      console.log(err);
      showErrorMess(moviesListConfig);
    });
  }, []);

  const [IsPreloaderVisible, setPreloaderVisibility] = React.useState(false);
  function handlePreloaderVisibility(value) {
    setPreloaderVisibility(value);
  };

  /* popup params */
  const [IsPopupOpen, setPopupVisibility] = React.useState(false);
  const [PopupData, setPopupData] = React.useState({
    isError: false,
    title: ''
  });

  function togglePopupVisibility() {
    if(IsPopupOpen) {
      setPopupVisibility(false);
    } else {
      setPopupVisibility(true);
    }
  }

  function showErrorMess(config) {
    const { errorMess } = config;
    setPopupData({
      isError: true,
      title: errorMess,
    });
    togglePopupVisibility();
  }

  /* auth */
  const [IsLoggedIn, setLoggedIn] = React.useState(false);

  function signUp(data) {
    const { email, password } = data;
    mainApi.authUser(data, signupConfig)
      .then(res => {
        //console.log(res);
        signIn({ email, password });
      })
      .catch(err => {
        console.log(err);
        const { status } = err;
        const { conflictErrorMess, validationErrorMess } = signupConfig;
        setPopupData({
          isError: true,
          title: status === CONFLICT_ERROR_CODE ? conflictErrorMess : validationErrorMess,
        });
        togglePopupVisibility();
      });
  }

  function signIn(data) {
    mainApi.authUser(data, signinConfig)
      .then(res => {
        //console.log(res);
        if(res.token) {
          const { token } = res;
          localStorage.setItem('token', token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch(err => {
        console.log(err);
        showErrorMess(signinConfig);
      });
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }

  function profileEdit(data) {
    const jwt = localStorage.getItem('token');
    if(jwt) {
      mainApi.setUserData(data, jwt, profileEditConfig)
        .then(res => {
          //console.log(res);
          const { _id, email, name } = res;
          const { succesMess } = profileEditConfig;
          setCurrentUser({
            id: _id,
            name,
            email
          });
          setPopupData({
            isError: false,
            title: succesMess
          });
          togglePopupVisibility();
        })
        .catch(err => {
          console.log(err);
          const { status } = err;
          const { conflictErrorMess, validationErrorMess } = profileEditConfig;
          setPopupData({
            isError: true,
            title: status === CONFLICT_ERROR_CODE ? conflictErrorMess : validationErrorMess,
          });
          togglePopupVisibility();
        });
    }
  }

  /* user cards params */
  const [CardsList, setCardsList] = React.useState([]);
  function getInitialCards(jwt) {
    mainApi.getUserCards(jwt, moviesListConfig)
      .then(res => {
        //console.log(res);
        setCardsList(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function addUserCard(data) {
    const jwt = localStorage.getItem('token');
    if(jwt) {
      mainApi.addCard(data, jwt, moviesListConfig)
        .then(res => {
          //console.log(res);
          getInitialCards(jwt);
        })
        .catch(err => {
          console.log(err);
          showErrorMess(moviesListConfig);
        });
    }
  }

  function removeUserCard(data) {
    const jwt = localStorage.getItem('token');
    if(jwt) {
      mainApi.removeCard(data, jwt, moviesListConfig)
        .then(res => {
          //console.log(res);
          getInitialCards(jwt);
        })
        .catch(err => {
          console.log(err);
          showErrorMess(moviesListConfig);
        });
    }
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if(jwt) {
      Promise.all([mainApi.getUserToken(jwt, profileEditConfig), mainApi.getUserCards(jwt, moviesListConfig)])
        .then(([userData, userCards]) => {
          const { _id, email, name } = userData;
          setCurrentUser({
            id: _id,
            name,
            email
          });
          setLoggedIn(true);
          setCardsList(userCards);
          history.push(location.pathname);
        })
        .catch((err) => {
          console.log(err);
          showErrorMess(moviesListConfig);
        });
    }
  }, [IsLoggedIn]);

  return (
    <CurrentUserContext.Provider value={CurrentUser}>
      <Switch>
        <Route exact path="/">
          <Header isLoggedIn={IsLoggedIn} />
          <Main />
          <Footer />
        </Route>
        <ProtectedRoute exact path="/movies" isLoggedIn={IsLoggedIn}>
          <Header isLoggedIn={IsLoggedIn} />
          <PreloaderContext.Provider value={IsPreloaderVisible}>
            <Movies cards={MoviesList} userCards={CardsList} handlePreloaderVisibility={handlePreloaderVisibility} addUserCard={addUserCard} removeUserCard={removeUserCard} popupData={PopupData} isPopupOpen={IsPopupOpen} togglePopupVisibility={togglePopupVisibility} />
          </PreloaderContext.Provider>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" isLoggedIn={IsLoggedIn}>
          <Header isLoggedIn={IsLoggedIn} />
          <PreloaderContext.Provider value={IsPreloaderVisible}>
            <SavedMovies cards={CardsList} handlePreloaderVisibility={handlePreloaderVisibility} addUserCard={addUserCard} removeUserCard={removeUserCard} popupData={PopupData} isPopupOpen={IsPopupOpen} togglePopupVisibility={togglePopupVisibility} />
          </PreloaderContext.Provider>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" isLoggedIn={IsLoggedIn}>
          <Header isLoggedIn={IsLoggedIn} />
          <Content contentClassMod="content_type_column">
            <ProfileForm handleForm={profileEdit} handleLogout={signOut} popupData={PopupData} isPopupOpen={IsPopupOpen} togglePopupVisibility={togglePopupVisibility} />
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
