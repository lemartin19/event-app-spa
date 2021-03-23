'use es6';

import { useState, useEffect } from 'react';
import { fetchEvents } from '../data/events';

export const useEventFeed = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    if (!events) fetchEvents().then(setEvents);
  }, [events]);

  return { currentUser: true, events: events || [] };
};
