const CONFLICT_ERROR_CODE = 409;

const SHORT_MOVIE_DURATION = 40;

export const access = {
  authUrl: 'https://api.ru39391-d.students.nomoredomains.icu/',
  moviesUrl: 'https://api.nomoreparties.co',
}

export const signupConfig = {
  endPoint: 'signup',
  succesMess: 'Вы успешно зарегистрировались',
  conflictErrorMess: 'Пользователь с таким email уже существует',
  validationErrorMess: 'При регистрации пользователя произошла ошибка'
}

export const signinConfig = {
  endPoint: 'signin',
  errorMess: 'Неверный логин или пароль'
}

export const profileEditConfig = {
  endPoint: 'users/me',
  succesMess: 'Профиль успешно обновлён',
  conflictErrorMess: 'Пользователь с таким email уже существует',
  validationErrorMess: 'При обновлении профиля произошла ошибка'
}

export const moviesListConfig = {
  endPoint: 'movies',
  warningMess: 'Ничего не найдено',
  errorMess: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

export const breakPointsData = {
  desktopPoint: 1024,
  tabletPoint: 768,
  mobilePoint: 480
}

export const gridParamsData = {
  desktopData: {
    length: 12,
    increment: 3
  },
  tabletData: {
    length: 8,
    increment: 2
  },
  mobileData: {
    length: 5,
    increment: 2
  }
}

export {
  CONFLICT_ERROR_CODE,
  SHORT_MOVIE_DURATION
};