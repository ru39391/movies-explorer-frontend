import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";

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

  const [MoviesList, setMoviesList] = React.useState([]);
  const [CurrentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    moviesApi.getInitialMovies()
    .then((res) => {
      setMoviesList(res);
    })
    .catch((err) => {
      console.log(err);
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

  /* auth */
  const [IsLoggedIn, setLoggedIn] = React.useState(false);

  function signUp(data) {
    mainApi.authUser(data, signupConfig)
      .then(res => {
        //console.log(res);
        const { succesMess } = signupConfig;
        setPopupData({
          isError: false,
          title: succesMess
        });
        togglePopupVisibility();
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
        const { errorMess } = signinConfig;
        setPopupData({
          isError: true,
          title: errorMess
        });
        togglePopupVisibility();
      });
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/');
  }

  function profileEdit(data) {
    const jwt = localStorage.getItem('token');
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

  function checkToken() {
    const jwt = localStorage.getItem('token');
    if(jwt) {
      mainApi.getUserToken(jwt, profileEditConfig)
        .then(res => {
          //console.log(res);
          const { _id, email, name } = res;
          setCurrentUser({
            id: _id,
            name,
            email
          });
          setLoggedIn(true);
          history.push('/movies');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  /* user cards params */
  const [CardsList, setCardsList] = React.useState([]);
  const [CardsListErrorMess, setCardsListErrorMess] = React.useState('');
  function getInitialCards() {
    const jwt = localStorage.getItem('token');
    mainApi.getUserCards(jwt, moviesListConfig)
      .then(res => {
        //console.log(res);
        setCardsList(res);
      })
      .catch(err => {
        console.log(err);
        const { errorMess } = moviesListConfig;
        setCardsListErrorMess(errorMess);
      });
  }

  function handleUserCard(data) {
    const jwt = localStorage.getItem('token');
    if(CardsList.find(item => item.movieId === data.id)) {
      mainApi.removeCard(data, jwt, moviesListConfig)
        .then(res => {
          //console.log(res);
          getInitialCards();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      mainApi.addCard(data, jwt, moviesListConfig)
        .then(res => {
          //console.log(res);
          getInitialCards();
        })
        .catch(err => {
          console.log(err);
        });
    };
  }

  React.useEffect(() => {
    getInitialCards();
  }, []);

  React.useEffect(() => {
    checkToken();
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
            <Movies cards={MoviesList} isLoggedIn={IsLoggedIn} handlePreloaderVisibility={handlePreloaderVisibility} handleUserCard={handleUserCard} />
          </PreloaderContext.Provider>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" isLoggedIn={IsLoggedIn}>
          <Header isLoggedIn={IsLoggedIn} />
          <SavedMovies cards={CardsList} errorMess={CardsListErrorMess} handlePreloaderVisibility={handlePreloaderVisibility} />
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
