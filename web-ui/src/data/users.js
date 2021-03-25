'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const CREATE_USER = 'CREATE_USER';

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
    [CREATE_USER]: (state) => {
      console.log('succeeded user creation');
      return state;
    },
  }
);
