'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const FETCH_INVITES = 'FETCH_INVITES';
const CREATE_INVITE = 'CREATE_INVITE';
const DELETE_INVITE = 'DELETE_INVITE';
const UPDATE_INVITE = 'UPDATE_INVITE';

export const RESPONSES = {
  Yes: 'Yes',
  No: 'No',
  Maybe: 'Maybe',
  [null]: 'No response',
};

export const fetchInvites = (eventId, token) =>
  fetch(`${API_BASE}/invites/${eventId}`, {
    headers: { 'x-auth': token },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.keys(response.errors)
        .map((key) => `${key}: ${response.errors[key].toString()}`)
        .join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: FETCH_INVITES, eventId, payload: data }));

export const createInvite = ({ event_id, user_email }, token) =>
  fetch(`${API_BASE}/invites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: JSON.stringify({ event_id, user_email }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.keys(response.errors)
        .map((key) => `${key}: ${response.errors[key].toString()}`)
        .join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: CREATE_INVITE, payload: data }));

export const deleteInvite = (id, token) =>
  fetch(`${API_BASE}/invites/${id}`, {
    method: 'DELETE',
    headers: { 'x-auth': token },
  })
    .then((response) => {
      if (response.ok) return response;
      const message = Object.keys(response.errors)
        .map((key) => `${key}: ${response.errors[key].toString()}`)
        .join('\n');
      throw new Error(message);
    })
    .then(() => ({ type: DELETE_INVITE, payload: { id } }));

export const updateInvite = ({ id, inviteRsvp }, token) =>
  fetch(`${API_BASE}/invites/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: JSON.stringify({ response: inviteRsvp, token }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.keys(response.errors)
        .map((key) => `${key}: ${response.errors[key].toString()}`)
        .join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: UPDATE_INVITE, payload: data }));

export const invitesReducer = createReducer(
  {},
  {
    [FETCH_INVITES]: (state, { eventId, payload }) =>
      Object.assign({}, state, { [eventId]: payload }),
    [CREATE_INVITE]: (state, { payload }) => {
      const prevInvites = state[payload.event_id] || [];
      return Object.assign({}, state, {
        [payload.event_id]: [...prevInvites, payload],
      });
    },
    [DELETE_INVITE]: (state, { payload }) => {
      const newInvites = {};
      Object.keys(state).forEach((key) => {
        newInvites[key] = state[key].filter(({ id }) => id !== payload.id);
      });
      return newInvites;
    },
    [UPDATE_INVITE]: (state, { payload }) => {
      const prevInvites = (state[payload.event_id] || []).filter(
        ({ id }) => id !== payload.id
      );
      return Object.assign({}, state, {
        [payload.event_id]: [...prevInvites, payload],
      });
    },
  }
);

export const getInvites = (state, eventId) => state.invites[eventId];
export const getInviteId = (state, eventId, userEmail) => {
  const invites = state.invites[eventId];
  const [maybeUsersInvite] = !invites
    ? []
    : invites.filter(({ user_email }) => user_email === userEmail);
  return maybeUsersInvite ? maybeUsersInvite.id : null;
};
