import fetch from 'isomorphic-fetch';

import { API_PREFIX, API_SUFFIX } from '../constants';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export const post = (url, params) => {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(params),
  };

  const URL = `${API_PREFIX}${url}${API_SUFFIX}`;

  return fetch(URL, data).then(checkStatus).then(parseJSON);
};

export const get = (url, params) => {
  const query = Object.keys(params).reduce((str, key) => {
    return `${str}${key}=${params[key]}&`;
  }, '?');

  const data = {
    method: 'GET',
  };

  const URL = `${API_PREFIX}${url}${API_SUFFIX}${query}`;

  return fetch(URL, data).then(checkStatus).then(parseJSON);
};
