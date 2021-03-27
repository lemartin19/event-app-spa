'use es6';

import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEvent } from '../data/events';
import { getSession } from '../data/session';
import { deleteInvite } from '../data/invites';

export const useInviteTable = (inviteId) => {
  const { id } = useParams();
  const event = useSelector((state) => getEvent(state, id));
  const session = useSelector(getSession);
  const isEventOwner = session.id === event.user_id;

  const onDelete = useCallback(
    () => (inviteId ? deleteInvite(inviteId, session.token) : null),
    []
  );

  return { isEventOwner, onDelete };
};
