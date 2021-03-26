'use es6';

import React from 'react';
import moment from 'moment';
import { Button, Container } from 'react-bootstrap';
import { useEventDetails } from '../hooks/useEventDetails';
import { useAdminControls } from '../hooks/useAdminControls';
import MaybeError from './MaybeError';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const EventInfo = ({ name, date, description, hostedBy }) => (
  <div>
    <h2>{name}</h2>
    <h5>Hosted by: {hostedBy}</h5>
    <div className="my-4">{moment(date).format('MMMM D, YYYY @ h:mm a')}</div>
    <div className="my-4">{description}</div>
  </div>
);
EventInfo.displayName = 'EventInfo';

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
  const { event, owner, comments, error } = useEventDetails();
  return !event ? (
    <MaybeError error={error} />
  ) : (
    <Container>
      <MaybeError error={error} />
      {event ? <EventInfo {...event} hostedBy={owner && owner.name} /> : null}
      {owner && event.user_id === owner.id ? <AdminControls /> : null}
      <CommentList comments={comments} />
      <CommentForm />
    </Container>
  );
};
EventDetails.displayName = 'EventDetails';

export default EventDetails;
