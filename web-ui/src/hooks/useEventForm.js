'use es6';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getSessionToken } from '../data/session';

export const useEventForm = (saveFn, initEvent = {}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    error: null,
    ...initEvent,
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
      saveFn(event, token)
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
