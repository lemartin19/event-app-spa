'use es6';

import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../data/comments';
import { getEvent } from '../data/events';
import { getSession, getSessionToken } from '../data/session';
import { fetchUser, getUser } from '../data/users';

export const useComment = (comment) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getSession);
  const owner = useSelector((state) => getUser(state, comment.user_id));
  const token = useSelector(getSessionToken);
  const postedAt = moment(comment.inserted_at).format('MMMM D, YYYY @ h:mm a');

  const event = useSelector((state) => getEvent(state, comment.event_id));
  const canDelete =
    comment.user_id === currentUser.id ||
    event.user_id === currentUser.id;
  const onDelete = useCallback(() =>
    deleteComment(comment.id, token)
      .then(dispatch)
      .catch(({ message }) => console.log(message))
  );

  useEffect(() => {
    if (!owner) fetchUser(comment.user_id).then(dispatch);
  }, [owner]);

  return {
    postedBy: owner && owner.name,
    postedAt,
    body: comment.body,
    onDelete: canDelete ? onDelete : null,
  };
};
