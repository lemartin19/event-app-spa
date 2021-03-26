'use es6';

import React from 'react';
import Datetime from 'react-datetime';
import { useEventForm } from '../hooks/useEventForm';
import { Alert, Button, Form } from 'react-bootstrap';

const EventForm = () => {
  const { event, setField, onSubmit, isLoading } = useEventForm();
  return (
    <React.Fragment>
      {event.error ? <Alert variant="danger">{event.error}</Alert> : null}
      <Form onSubmit={onSubmit} className="max-width-50p">
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
        <Datetime
          value={event.date}
          onChange={(value) => setField('date', value)}
          dateFormat="YYYY-MM-DD"
          timeFormat="HH:mm:SS"
          className="mb-4 max-width-300"
          input={false}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
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
