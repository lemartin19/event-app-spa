'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const FETCH_COMMENTS = 'FETCH_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const fetchComments = (eventId, token) =>
  fetch(`${API_BASE}/comments/${eventId}`, {
    headers: { 'x-auth': token },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: FETCH_COMMENTS, eventId, payload: data }));

export const createComment = ({ eventId, body }, token) =>
  fetch(`${API_BASE}/comments`, {
    method: 'POST',
    headers: { 'x-auth': token },
    body: JSON.stringify({ eventId, body }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: CREATE_COMMENT, payload: data }));

export const deleteComment = (id, token) =>
  fetch(`${API_BASE}/comments/${id}`, {
    method: 'DELETE',
    headers: { 'x-auth': token },
  })
    .then((response) => {
      if (response.ok) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(() => ({ type: DELETE_COMMENT, payload: { id } }));

export const commentsReducer = createReducer(
  {},
  {
    [FETCH_COMMENTS]: (state, { eventId, payload }) =>
      Object.assign({}, state, { [eventId]: payload }),
    [CREATE_COMMENT]: (state, { payload }) => {
      const prevComments = state[payload.event_id] || [];
      return Object.assign({}, state, {
        [payload.event_id]: [...prevComments, payload],
      });
    },
    [DELETE_COMMENT]: (state, { payload }) => {
      const newComments = {};
      Object.keys(state).forEach((key) => {
        newComments[key] = state[key].filter(({ id }) => id !== payload.id);
      });
      return newComments;
    },
  }
);

export const getComments = (state, eventId) => state.comments[eventId];
