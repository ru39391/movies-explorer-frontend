import React from 'react';
import { access } from './constants';

class MoviesApi extends React.Component {
  constructor(baseUrl) {
    super();
    this._baseUrl = baseUrl;
  }

  _checkResponse(result, resultAlert) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {return this._checkResponse(res, 'Ошибка при загрузке карточек')});
  }
}

const moviesApi = new MoviesApi(access.moviesUrl);

export default moviesApi;