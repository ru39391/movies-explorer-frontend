import React from 'react';
import { access } from './constants';

class Auth extends React.Component {
  constructor(baseUrl) {
    super();
    this._baseUrl = baseUrl;
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject({
      status: result.status
    });
  }

  _setBody(data) {
    const body = {};
    const dataArr = Object.keys(data);
    for(let i = 0; i < dataArr.length; i++) {
      body[dataArr[i]] = data[dataArr[i]];
    }
    return body;
  }

  authUser(data, config) {
    return fetch(`${this._baseUrl}${config.endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this._setBody(data))
    })
      .then(res => this._checkResponse(res));
  }

  getUserToken(jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`
      }
    })
      .then(res => this._checkResponse(res));
      //, 'Ошибка при получении JSON Web Token'
  }
}

const auth = new Auth(access.authUrl);

export default auth;