'use es6';

import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import { useEventForm } from '../hooks/useEventForm';
import { Button, Form } from 'react-bootstrap';
import MaybeError from './MaybeError';

const EventForm = ({ type = 'Create', saveFn, initEvent }) => {
  const { event, setField, onSubmit, isLoading } = useEventForm(
    saveFn,
    initEvent
  );
  return (
    <React.Fragment>
      <MaybeError error={event.error} />
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
          inputProps={{
            value: event.date
              ? moment(event.date).format('MMMM D, YYYY @ h:mm a')
              : '',
          }}
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
          {isLoading ? 'Loading...' : `${type} event`}
        </Button>
      </Form>
    </React.Fragment>
  );
};
EventForm.displayName = 'EventForm';

export default EventForm;
