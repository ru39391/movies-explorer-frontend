import React from 'react';
import { access } from './constants';

class MainApi extends React.Component {
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

  _setHeadersAuthorized(jwt) {
    return {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${jwt}`
    };
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

  getUserToken(jwt, config) {
    return fetch(`${this._baseUrl}${config.endPoint}`, {
      method: 'GET',
      headers: this._setHeadersAuthorized(jwt)
    })
      .then(res => this._checkResponse(res));
  }

  setUserData(data, jwt, config) {
    return fetch(`${this._baseUrl}${config.endPoint}`, {
      method: 'PATCH',
      headers: this._setHeadersAuthorized(jwt),
      body: JSON.stringify(this._setBody(data))
    })
      .then(res => this._checkResponse(res));
  }
}

const mainApi = new MainApi(access.authUrl);

export default mainApi;