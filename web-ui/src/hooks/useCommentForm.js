'use es6';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createComment } from '../data/comments';
import { getSessionToken } from '../data/session';

export const useCommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const token = useSelector(getSessionToken);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      createComment({ eventId: id, body: comment }, token)
        .then((action) => {
          setIsLoading(false);
          dispatch(action);
          setComment('');
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setError(message);
        });
    },
    [id, token, comment, dispatch]
  );

  return { comment, setComment, isLoading, onSubmit, error };
};
