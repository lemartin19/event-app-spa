'use es6';

import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useEventDetails } from '../hooks/useEventDetails';

const MaybeError = ({ error }) =>
  !error ? null : <Alert variant="danger">{error}</Alert>;
MaybeError.displayName = 'MaybeError';

const EventDetails = () => {
  const { event, owner, error } = useEventDetails();
  return !event ? (
    <MaybeError error={error} />
  ) : (
    <Container>
      <MaybeError error={error} />
      <h2>{event.name}</h2>
      <h6>Hosted by: {owner && owner.name}</h6>
      <div className="my-4">{event.description}</div>
    </Container>
  );
};
EventDetails.displayName = 'EventDetails';

export default EventDetails;
