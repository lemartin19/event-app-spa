'use es6';

import { combineReducers, createStore } from 'redux';
import { eventsReducer } from './events';
import { sessionReducer } from './session';
import { userReducer } from './users';

const rootReducer = combineReducers({
  // comments,
  events: eventsReducer,
  // invites,
  session: sessionReducer,
  users: userReducer,
});

export default createStore(rootReducer);
