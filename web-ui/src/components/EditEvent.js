'use es6';

import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { updateEvent } from '../data/events';
import { useEvent } from '../hooks/useEvent';
import EventForm from './EventForm';
import MaybeError from './MaybeError';

const EditEvent = () => {
  const { id } = useParams();
  const { event, error } = useEvent(id);
  return (
    <Container>
      <h2 className="my-4">Edit event</h2>
      {!event || error ? (
        <MaybeError error={error} />
      ) : (
        <EventForm initEvent={event} saveFn={updateEvent} />
      )}
    </Container>
  );
};
EditEvent.displayName = 'EditEvent';

export default EditEvent;
