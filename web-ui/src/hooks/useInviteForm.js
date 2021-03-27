'use es6';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createInvite } from '../data/invites';
import { getSessionToken } from '../data/session';

export const useInviteForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const token = useSelector(getSessionToken);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      createInvite({ event_id: id, user_email: email }, token)
        .then((action) => {
          setIsLoading(false);
          dispatch(action);
          setEmail('');
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setError(message);
        });
    },
    [id, token, email, dispatch]
  );

  return { email, setEmail, isLoading, onSubmit, error };
};
