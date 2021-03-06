'use es6';

import { combineReducers, createStore } from 'redux';
import { commentsReducer } from './comments';
import { eventsReducer } from './events';
import { invitesReducer } from './invites';
import { sessionReducer } from './session';
import { userReducer } from './users';

const rootReducer = combineReducers({
  comments: commentsReducer,
  events: eventsReducer,
  invites: invitesReducer,
  session: sessionReducer,
  users: userReducer,
});

export default createStore(rootReducer);
