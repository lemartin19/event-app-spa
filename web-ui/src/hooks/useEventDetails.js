'use es6';

import { useParams } from 'react-router';
import { useEvent } from '../hooks/useEvent';

export const useEventDetails = () => {
  const { id } = useParams();
  const { event, owner, comments, error } = useEvent(id);
  return { event, owner, comments, error };
};
