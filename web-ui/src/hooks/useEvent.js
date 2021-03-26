'use es6';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvent, getEvent } from '../data/events';
import { fetchUser, getUser } from '../data/users';

export const useEvent = (eventId) => {
  const dispatch = useDispatch();
  const event = useSelector((state) => getEvent(state, eventId));
  const owner = useSelector((state) => getUser(state, event && event.user_id));
  const [error, setError] = useState();

  useEffect(() => {
    if (!event) fetchEvent().then(dispatch).catch(setError);
  }, [event, dispatch]);

  useEffect(() => {
    if (event && event.user_id && !owner)
      fetchUser(event.user_id)
        .then(dispatch)
        .catch((err) => console.log(err));
  });

  return { event, owner, error };
};
