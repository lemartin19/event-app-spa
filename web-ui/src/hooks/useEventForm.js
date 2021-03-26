'use es6';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../data/events';

export const useEventForm = () => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    error: null,
  });
  const [isLoading, setIsLoading] = useState();

  const setField = useCallback(
    (field, value) =>
      setEvent((oldEvent) => Object.assign({}, oldEvent, { [field]: value })),
    []
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      createEvent(event.name, event.description, event.date)
        .then(dispatch)
        .catch(({ message }) => setField('error', message))
        .finally(() => setIsLoading(false));
    },
    [event.name, event.description, event.date, dispatch]
  );

  return { event, setField, onSubmit, isLoading };
};
