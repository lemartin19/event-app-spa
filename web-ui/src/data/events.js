'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const FETCH_EVENTS = 'FETCH_EVENTS';
const FETCH_EVENT = 'FETCH_EVENT';
const CREATE_EVENT = 'CREATE_EVENT';

export const fetchEvents = () =>
  fetch(`${API_BASE}/events`)
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: FETCH_EVENTS, payload: data }));

export const fetchEvent = (id) =>
  fetch(`${API_BASE}/events/${id}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: FETCH_EVENT, payload: data }));

export const createEvent = (name, description, date, token) =>
  fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: JSON.stringify({ name, description, date, token }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: CREATE_EVENT, payload: data }));

export const eventsReducer = createReducer(
  { data: {}, isLoaded: false },
  {
    [FETCH_EVENTS]: (state, { payload }) => {
      const events = {};
      payload.forEach((event) => {
        events[event.id] = event;
      });
      return { data: events, isLoaded: true };
    },
    [FETCH_EVENT]: ({ data, isLoaded }, { payload }) => ({
      data: Object.assign({}, data, { [payload.id]: payload }),
      isLoaded,
    }),
    [CREATE_EVENT]: ({ data, isLoaded }, { payload }) => ({
      data: Object.assign({}, data, { [payload.id]: payload }),
      isLoaded,
    }),
  }
);

export const getEvents = (state) => state.events.data;
export const getEventsAreLoaded = (state) => state.events.isLoaded;
export const getEvent = (state, id) => state.events.data[id];
