'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE, LOCAL_STORAGE_SESSION_KEY } from '../config';
import { CREATE_USER } from './users';

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

export const postLogout = () => ({ type: LOGOUT });

const saveSession = (session) => {
  const sessionWithTime = Object.assign({}, session, { time: Date.now() });
  localStorage.setItem(
    LOCAL_STORAGE_SESSION_KEY,
    JSON.stringify(sessionWithTime)
  );
};

const loadSession = () => {
  const sessionJson = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
  if (!sessionJson) return null;

  const session = JSON.parse(sessionJson);
  const age = Date.now() - session.time;
  const hours = 60 * 60 * 1000;

  return age < 24 * hours ? session : null;
};

export const sessionReducer = createReducer(loadSession(), {
  [LOGIN]: (state, { payload }) => {
    saveSession(payload);
    return payload;
  },
  [LOGOUT]: () => {
    saveSession(null);
    return null;
  },
  [CREATE_USER]: (state, { payload }) => {
    saveSession(payload);
    return payload;
  },
});

export const getSession = (state) => state.session;
export const getCurrentUserName = (state) =>
  state.session && state.session.name;
export const getSessionToken = (state) => state.session && state.session.token;
