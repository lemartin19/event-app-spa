'use es6';

import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import EventFeed from './EventFeed';
import EventDetails from './EventDetails';
import NewEvent from './NewEvent';
import UserDetails from './UserDetails';
import NewUser from './NewUser';
import Login from './Login';

const App = () => (
  <Container className="App">
    <BrowserRouter>
      <Nav />
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <EventFeed />
        </Route>
      </Switch>
    </BrowserRouter>
  </Container>
);
App.displayName = 'App';

export default App;
