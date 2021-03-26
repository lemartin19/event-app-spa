'use es6';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../data/events';
import { getSessionToken } from '../data/session';

export const useEventForm = () => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    error: null,
  });
  const [isLoading, setIsLoading] = useState();
  const token = useSelector(getSessionToken);

  const setField = useCallback(
    (field, value) =>
      setEvent((oldEvent) => Object.assign({}, oldEvent, { [field]: value })),
    []
  );

  const onSubmit = useCallback(
    (submitEvent) => {
      submitEvent.preventDefault();
      setIsLoading(true);
      createEvent(event.name, event.description, event.date, token)
        .then(dispatch)
        .catch(({ message }) => setField('error', message))
        .finally(() => setIsLoading(false));
    },
    [event.name, event.description, event.date, token, dispatch]
  );

  return { event, setField, onSubmit, isLoading };
};
