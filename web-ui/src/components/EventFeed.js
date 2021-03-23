'use es6';

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserPhotoPath } from '../data/clients';
import { useEventFeed } from '../hooks/useEventFeed';

const Event = ({ event }) => {
  return (
    <div className="col-sm-4 p-2">
      <Card className="h-100">
        <Card.Img variant="top">
          <div className="text-center d-flex align-items-center min-h-50">
            <img
              src={getUserPhotoPath(event.user.id)}
              alt="host avatar"
              className="w-100"
            />
          </div>
        </Card.Img>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Link>
          <Link to={`/events/${event.id}`}>Show Event</Link>
        </Card.Link>
      </Card>
    </div>
  );
};
Event.displayName = 'Event';

const EventFeed = () => {
  const { currentUser, events } = useEventFeed();

  return (
    <div>
      <h2 className="my-4">Event Feed</h2>
      {currentUser ? (
        <React.Fragment>
          <div className="row mb-4">
            <div className="col">
              <Link to="/events/new">New Event</Link>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {!events.length
              ? 'No events to display'
              : events.map((event) => <Event event={event} key={event.id} />)}
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
