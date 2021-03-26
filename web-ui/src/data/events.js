'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const FETCH_EVENTS = 'FETCH_EVENTS';

export const fetchEvents = () =>
  fetch(`${API_BASE}/events`)
    .then((response) => response.json())
    .then(({ data }) => ({ type: FETCH_EVENTS, payload: data }))
    .catch((err) => console.log(err));

export const createEvent = (name, description, date) =>
  fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, date }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data) return response;
      const message = Object.values(response.errors).join('\n');
      throw new Error(message);
    })
    .then(({ data }) => ({ type: FETCH_EVENTS, payload: data }));

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
  }
);

export const getEvents = (state) => Object.values(state.events.data);
export const getEventsAreLoaded = (state) => state.events.isLoaded;
