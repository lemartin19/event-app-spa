'use es6';

import React from 'react';
import moment from 'moment';
import { Button, Container } from 'react-bootstrap';
import { useEventDetails } from '../hooks/useEventDetails';
import { useAdminControls } from '../hooks/useAdminControls';
import MaybeError from './MaybeError';

const AdminControls = () => {
  const { onEdit, onDelete, error } = useAdminControls();
  return (
    <div>
      <MaybeError error={error} />
      <div>
        <Button variant="primary" size="sm" onClick={onEdit} className="mr-2">
          Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
AdminControls.displayName = 'AdminControls';

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
      {owner && event.user_id === owner.id ? <AdminControls /> : null}
    </Container>
  );
};
EventDetails.displayName = 'EventDetails';

export default EventDetails;
