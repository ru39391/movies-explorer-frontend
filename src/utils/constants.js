export const access = {
  authUrl: 'https://api.ru39391-d.students.nomoredomains.icu/',
  cardsUrl: 'https://api.nomoreparties.co',
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