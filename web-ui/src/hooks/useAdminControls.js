'use es6';

import { useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../data/events';
import { getSessionToken } from '../data/session';

export const useAdminControls = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const token = useSelector(getSessionToken);

  const onEdit = useCallback(() => history.push(`/events/${id}/edit`), [id]);
  const onDelete = useCallback(() => {
    deleteEvent(id, token)
      .then((action) => {
        history.push('/');
        dispatch(action);
      })
      .catch(({ message }) => setError(message));
  }, [id, dispatch]);

  return { onEdit, onDelete, error };
};
