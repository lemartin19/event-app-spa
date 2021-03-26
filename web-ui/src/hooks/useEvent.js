'use es6';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, getComments } from '../data/comments';
import { fetchEvent, getEvent } from '../data/events';
import { fetchInvites, getInvites } from '../data/invites';
import { getSessionToken } from '../data/session';
import { fetchUser, getUser } from '../data/users';

export const useEvent = (eventId) => {
  const dispatch = useDispatch();
  const token = useSelector(getSessionToken);
  const event = useSelector((state) => getEvent(state, eventId));
  const owner = useSelector((state) => getUser(state, event && event.user_id));
  const comments = useSelector((state) => getComments(state, eventId));
  const invites = useSelector((state) => getInvites(state, eventId));
  const [error, setError] = useState();

  useEffect(() => {
    if (!event)
      fetchEvent(eventId, token)
        .then(dispatch)
        .catch(({ message }) => setError(message));
  }, [event, dispatch]);

  useEffect(() => {
    if (event && event.user_id && !owner)
      fetchUser(event.user_id)
        .then(dispatch)
        .catch(({ message }) => console.log(message));
  });

  useEffect(() => {
    if (!comments)
      fetchComments(eventId, token)
        .then(dispatch)
        .catch(({ message }) => console.log(message));
  }, [event, dispatch]);

  useEffect(() => {
    if (!invites)
      fetchInvites(eventId, token)
        .then(dispatch)
        .catch(({ message }) => console.log(message));
  });

  return { event, owner, comments, invites, error };
};
