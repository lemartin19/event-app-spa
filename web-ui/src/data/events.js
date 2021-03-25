'use es6';

import { createReducer } from '@reduxjs/toolkit';
import { API_BASE } from '../config';

const FETCH_EVENTS = 'FETCH_EVENTS';

export const fetchEvents = () =>
  fetch(`${API_BASE}/events`)
    .then((response) => response.json())
    .then(({ data }) => ({ type: FETCH_EVENTS, payload: data }))
    .catch((err) => console.log(err));

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
