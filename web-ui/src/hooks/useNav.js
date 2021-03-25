'use es6';

import { useSelector } from 'react-redux';
import { getCurrentUserName } from '../data/session';

export const useNav = () => {
  const name = useSelector(getCurrentUserName);
  return { name };
};
