'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const FETCH_USERS = 'FETCH_USERS';
const FETCH_USER = 'FETCH_USER';
export const CREATE_USER = 'CREATE_USER';

export const fetchUsers = () =>
  fetch(`${API_BASE}/users`)
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: FETCH_USERS, payload: data }));

export const fetchUser = (id) =>
  fetch(`${API_BASE}/users/${id}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: FETCH_USER, payload: data }));

export const createUser = (username, email, password) =>
  fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: username, email, password }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: CREATE_USER, payload: data }));

export const userReducer = createReducer(
  {},
  {
    [FETCH_USERS]: (state, { payload }) => {
      const users = {};
      payload.forEach((user) => {
        users[user.id] = user;
      });
      return users;
    },
    [FETCH_USER]: (state, { payload }) =>
      Object.assign({}, state, { [payload.id]: payload }),
    [CREATE_USER]: (state, { payload }) =>
      Object.assign({}, state, { [payload.id]: payload }),
  }
);
