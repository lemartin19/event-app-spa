'use es6';

import { combineReducers, createStore } from 'redux';
import { eventsReducer } from './events';
import { sessionReducer } from './session';

const rootReducer = combineReducers({
  // comments,
  events: eventsReducer,
  // invites,
  session: sessionReducer,
  // users,
});

export default createStore(rootReducer);
