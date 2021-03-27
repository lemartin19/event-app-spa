'use es6';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getInviteId, updateInvite } from '../data/invites';
import { getSession, getSessionToken } from '../data/session';

export const useRsvpForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const session = useSelector(getSession);
  const inviteId = useSelector((state) =>
    getInviteId(state, id, session.email)
  );
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const token = useSelector(getSessionToken);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      updateInvite({ id: inviteId, inviteRsvp: response }, token)
        .then((action) => {
          setIsLoading(false);
          dispatch(action);
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setError(message);
        });
    },
    [id, token, response, dispatch]
  );

  return { isInvitee: !!inviteId, setResponse, isLoading, onSubmit, error };
};
