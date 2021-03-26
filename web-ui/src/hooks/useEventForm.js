'use es6';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createEvent } from '../data/events';
import { getSessionToken } from '../data/session';

export const useEventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
        .then((action) => {
          setIsLoading(false);
          history.push(`/events/${action.payload.id}`);
          dispatch(action);
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setField('error', message);
        });
    },
    [event.name, event.description, event.date, token, history, dispatch]
  );

  return { event, setField, onSubmit, isLoading };
};
