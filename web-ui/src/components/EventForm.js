'use es6';

import React from 'react';
import DateTimePicker from 'react-datetime-bootstrap';
import { useEventForm } from '../hooks/useEventForm';
import { Alert, Button, Form } from 'react-bootstrap';

const EventForm = () => {
  const { event, setField, onSubmit, isLoading } = useEventForm();
  return (
    <React.Fragment>
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
        <DateTimePicker
          id="event-date"
          value={event.date}
          onChange={({ target }) => setField('date', target.value)}
          format="YYYY-MM-DD hh:mm"
          className="mb-4"
        />
        <Form.Control name="date" type="date" required />
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
    </React.Fragment>
  );
};
EventForm.displayName = 'EventForm';

export default EventForm;
