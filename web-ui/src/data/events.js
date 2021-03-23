'use es6';

import { API_BASE } from '../config';

export const fetchEvents = () =>
  fetch(`${API_BASE}/events`)
    .then((response) => response.json())
    .then((val) => val.data)
    .catch((err) => console.log(err));
