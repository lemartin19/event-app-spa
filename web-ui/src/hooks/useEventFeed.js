'use es6';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, getEvents, getEventsAreLoaded } from '../data/events';

export const useEventFeed = () => {
  const eventsLoaded = useSelector(getEventsAreLoaded);
  const events = useSelector(getEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!eventsLoaded) fetchEvents().then(dispatch);
  }, [events]);

  return { currentUser: true, events };
};
