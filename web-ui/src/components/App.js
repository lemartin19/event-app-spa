'use es6';

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EventFeed from './EventFeed';
import EventDetails from './EventDetails';
import NewEvent from './NewEvent';
import UserDetails from './UserDetails';
import NewUser from './NewUser';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/events/new">
          <NewEvent />
        </Route>
        <Route path="/events/:id">
          <EventDetails />
        </Route>
        <Route path="/users/new">
          <NewUser />
        </Route>
        <Route path="/users/:id">
          <UserDetails />
        </Route>
        <Route path="/">
          <EventFeed />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
App.displayName = 'App';

export default App;
