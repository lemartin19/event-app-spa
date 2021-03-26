'use es6';

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEvent } from '../hooks/useEvent';
import { useEventFeed } from '../hooks/useEventFeed';
import MaybeError from './MaybeError';

const Event = ({ eventId }) => {
  const { event, owner, error } = useEvent(eventId);
  return !event ? null : (
    <div className="col-sm-4 p-2">
      <Card className="h-100">
        <Card.Body>
          {error ? (
            <MaybeError error={error} />
          ) : (
            <React.Fragment>
              <Card.Title>{event.name}</Card.Title>
              <Card.Subtitle className="text-muted mb-2">
                Hosted by: {!owner ? '' : owner.name}
              </Card.Subtitle>
              <Card.Text>{event.description}</Card.Text>
              <Link to={`/events/${event.id}`}>Show Event</Link>
            </React.Fragment>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
Event.displayName = 'Event';

const EventFeed = () => {
  const { isLoggedIn, eventIds } = useEventFeed();

  return (
    <div>
      <h2 className="my-4">Event Feed</h2>
      {isLoggedIn ? (
        <React.Fragment>
          <div className="row mb-4">
            <div className="col">
              <Link to="/events/new">New Event</Link>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {!eventIds.length
              ? 'No events to display'
              : eventIds.map((id) => <Event eventId={id} key={id} />)}
          </div>
        </React.Fragment>
      ) : (
        <div className="d-flex flex-wrap">Login to view events</div>
      )}
    </div>
  );
};
EventFeed.displayName = 'EventFeed';

export default EventFeed;
