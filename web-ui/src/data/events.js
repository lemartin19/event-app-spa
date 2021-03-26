'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const FETCH_EVENTS = 'FETCH_EVENTS';
const CREATE_EVENT = 'CREATE_EVENT';

export const fetchEvents = () =>
  fetch(`${API_BASE}/events`)
    .then((response) => response.json())
    .then(({ data }) => ({ type: FETCH_EVENTS, payload: data }))
    .catch((err) => console.log(err));

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
    [FETCH_EVENTS]: ({ data }, { payload }) => {
      const events = {};
      payload.forEach((event) => {
        events[event.id] = event;
      });
      return { data: Object.assign({}, data, events), isLoaded: true };
    },
    [CREATE_EVENT]: ({ data }, { payload }) => ({
      data: Object.assign({}, data, { [payload.id]: payload }),
      isLoaded: true,
    }),
  }
);

export const getEvents = (state) => Object.values(state.events.data);
export const getEventsAreLoaded = (state) => state.events.isLoaded;
