'use es6';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserName, postLogout } from '../data/session';

export const useNav = () => {
  const name = useSelector(getCurrentUserName);

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => dispatch(postLogout()), [dispatch]);
  return { name, handleLogout };
};
