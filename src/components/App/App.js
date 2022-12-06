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
import { signupConfig, signinConfig, profileEditConfig } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PreloaderContext from '../../contexts/PreloaderContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const history = useHistory();

  const [CurrentUser, setCurrentUser] = React.useState({});
  function handleCurrentUser(data) {
    setCurrentUser(data);
  };

  const [Cards, setCardsList] = React.useState([]);
  React.useEffect(() => {
    moviesApi.getInitialCards()
    .then((res) => {
      setCardsList(res);
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
  const [PopupData, setPopupData] = React.useState({
    isError: false,
    title: ''
  });
  const [IsPopupOpen, setPopupVisibility] = React.useState(false);

  /* popup handlers */
  function setPopupParams(data) {
    setPopupData(data);
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
  function handleLoggedOut() {
    setLoggedIn(false);
  };

  function signUp(data) {
    mainApi.authUser(data, signupConfig)
      .then(res => {
        //console.log(res);
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
    mainApi.authUser(data, signinConfig)
      .then(res => {
        //console.log(res);
        if(res.token) {
          const { token } = res;
          localStorage.setItem('token', token);
          handleLoggedIn();
          history.push('/profile');
        }
      })
      .catch(err => {
        console.log(err);
        const { errorMess } = signinConfig;
        setPopupParams({
          isError: true,
          title: errorMess
        });
        togglePopupVisibility();
      });
  }

  function profileEdit(data) {
    const jwt = localStorage.getItem('token');
    mainApi.setUserData(data, jwt, profileEditConfig)
      .then(res => {
        //console.log(res);
        const { name, email } = res;
        const { succesMess } = profileEditConfig;
        handleCurrentUser({
          name: name,
          email: email
        });
        setPopupParams({
          isError: false,
          title: succesMess
        });
        togglePopupVisibility();
      })
      .catch(err => {
        console.log(err);
        const { status } = err;
        const { conflictErrorMess, validationErrorMess } = profileEditConfig;
        setPopupParams({
          isError: true,
          title: status === 409 ? conflictErrorMess : validationErrorMess,
        });
        togglePopupVisibility();
      });
  }

  function signOut() {
    handleLoggedOut();
    localStorage.removeItem('token');
    history.push('/signin');
  }

  function checkToken() {
    const jwt = localStorage.getItem('token');
    if(jwt) {
      mainApi.getUserToken(jwt, profileEditConfig)
        .then(res => {
          //console.log(res);
          const { _id, email, name } = res;
          handleCurrentUser({
            id: _id,
            email: email,
            name: name
          });
          handleLoggedIn();
          history.push('/profile');
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
          <Header isLoggedIn={IsLoggedIn} />
          <Main />
          <Footer />
        </Route>
        <ProtectedRoute exact path="/movies" isLoggedIn={IsLoggedIn}>
          <Header isLoggedIn={IsLoggedIn} />
          <PreloaderContext.Provider value={IsPreloaderVisible}>
            <Movies cards={Cards} handlePreloaderVisibility={handlePreloaderVisibility} />
          </PreloaderContext.Provider>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" isLoggedIn={IsLoggedIn}>
          <Header isLoggedIn={IsLoggedIn} />
          <SavedMovies cards={Cards} />
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
