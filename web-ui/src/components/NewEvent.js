'use es6';

import React from 'react';
import { Container } from 'react-bootstrap';
import EventForm from './EventForm';

const NewEvent = () => {
  return (
    <Container>
      <h2 className="my-4">Create new event</h2>
      <EventForm />
    </Container>
  );
};
NewEvent.displayName = 'NewEvent';

export default NewEvent;
