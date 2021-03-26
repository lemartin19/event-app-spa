'use es6';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, getEvents, getEventsAreLoaded } from '../data/events';
import { getSessionToken } from '../data/session';
import { fetchUsers, getUsersAreLoaded } from '../data/users';

export const useEventFeed = () => {
  const eventsLoaded = useSelector(getEventsAreLoaded);
  const events = useSelector(getEvents);
  const areUsersLoaded = useSelector(getUsersAreLoaded);
  const token = useSelector(getSessionToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!eventsLoaded) fetchEvents(token).then(dispatch);
  }, [events]);

  useEffect(() => {
    if (!areUsersLoaded) fetchUsers().then(dispatch);
  }, [areUsersLoaded]);

  return { isLoggedIn: !!token, eventIds: Object.keys(events) };
};
