'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const postLogin = (email, password) =>
  fetch(`${API_BASE}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      throw new Error('Login failed.');
    })
    .then(({ data }) => ({ type: LOGIN, payload: data }));

export const postLogout = () =>
  fetch(`${API_BASE}/session`, {
    method: 'DELETE',
  }).then(() => ({ type: LOGOUT }));

export const sessionReducer = createReducer(null, {
  [LOGIN]: (state, { payload }) => payload,
  [LOGOUT]: () => null,
});

export const getSession = (state) => state.session;
export const getCurrentUserName = (state) =>
  state.session && state.session.name;
export const getSessionToken = (state) => state.session && state.session.token;
