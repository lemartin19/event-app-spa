'use es6';

import React from 'react';
import moment from 'moment';
import { Container } from 'react-bootstrap';
import { useEventDetails } from '../hooks/useEventDetails';
import MaybeError from './MaybeError';

const EventDetails = () => {
  const { event, owner, error } = useEventDetails();
  return !event ? (
    <MaybeError error={error} />
  ) : (
    <Container>
      <MaybeError error={error} />
      <h2>{event.name}</h2>
      <h5>Hosted by: {owner && owner.name}</h5>
      <div className="my-4">
        {moment(event.date).format('MMMM D, YYYY @ h:mm a')}
      </div>
      <div className="my-4">{event.description}</div>
    </Container>
  );
};
EventDetails.displayName = 'EventDetails';

export default EventDetails;
