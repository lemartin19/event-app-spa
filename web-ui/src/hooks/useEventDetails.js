'use es6';

import { useParams } from 'react-router';
import { useEvent } from '../hooks/useEvent';
import { useRequireAuth } from './useRequireAuth';

export const useEventDetails = () => {
  const { id } = useParams();
  const { event, owner, comments, error } = useEvent(id);
  useRequireAuth(`/events/${id}`);
  return { event, owner, comments, error };
};
