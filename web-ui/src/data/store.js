'use es6';

import { combineReducers, createStore } from 'redux';
import { eventsReducer } from './events';

const rootReducer = combineReducers({
  // comments,
  events: eventsReducer,
  // invites,
  // session,
  // users,
});

export default createStore(rootReducer);
