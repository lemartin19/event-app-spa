'use es6';

import { createReducer } from '@reduxjs/toolkit';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const postLogin = ({ email, password }) =>
  fetch(`${API_BASE}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((val) => console.log('not an error: ' + val))
    .catch((err) => console.log(err));

export const sessionReducer = createReducer(null, {
  [LOGIN]: (state, ({ payload }) => payload),
  [LOGOUT]: () => null,
});

export const getSession = (state) => state.session;
