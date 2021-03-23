'use es6';

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserPhotoPath } from '../data/clients';
import { useEventFeed } from '../hooks/useEventFeed';

const Event = ({ event }) => {
  return (
    <div class="col-sm-4 p-2">
      <Card class="h-100">
        <Card.Img variant="top">
          <div class="text-center d-flex align-items-center min-h-50">
            <img
              src={getUserPhotoPath(event.user.id)}
              alt="host avatar"
              class="w-100"
            />
          </div>
        </Card.Img>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text class="card-text">{event.description}</Card.Text>
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

  return currentUser ? (
    <div>
      <div class="row">
        <div class="col mb-2">
          <Link to="/events/new">New Event</Link>
        </div>
      </div>
      <div class="d-flex flex-wrap">
        {!events.length
          ? 'No events to display'
          : events.map((event) => <Event event={event} key={event.id} />)}
      </div>
    </div>
  ) : (
    <div class="d-flex flex-wrap">Login to view events</div>
  );
};
EventFeed.displayName = 'EventFeed';

export default EventFeed;
