'use es6';

import React from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useNewEvent } from '../hooks/useNewEvent';

const NewEvent = () => {
  const { event, setField, onSubmit, isLoading } = useNewEvent();

  return (
    <Container>
      <h2 className="my-4">Create new event</h2>
      {event.error ? <Alert variant="danger">{event.error}</Alert> : null}
      <Form onSubmit={onSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={({ target }) => setField('name', target.value)}
          value={event.name}
          className="mb-4"
          required
        />
        <Form.Label>Date</Form.Label>
        <Form.Control
          name="date"
          type="date"
          onChange={({ target }) => setField('date', target.value)}
          value={event.date}
          className="mb-4"
          required
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          type="text"
          onChange={({ target }) => setField('description', target.value)}
          value={event.description}
          className="mb-4"
          required
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create event'}
        </Button>
      </Form>
    </Container>
  );
};
NewEvent.displayName = 'NewEvent';

export default NewEvent;
