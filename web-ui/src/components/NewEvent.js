'use es6';

import React from 'react';
import { Container } from 'react-bootstrap';
import { createEvent } from '../data/events';
import EventForm from './EventForm';

const NewEvent = () => (
  <Container>
    <h2 className="my-4">Create new event</h2>
    <EventForm saveFn={createEvent} />
  </Container>
);
NewEvent.displayName = 'NewEvent';

export default NewEvent;
