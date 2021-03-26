'use es6';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postLogin } from '../data/session';
import { useQueryParams } from './useQueryParams';

export const useLogin = () => {
  const [login, setLogin] = useState({ email: '', password: '', error: null });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { redirect } = useQueryParams();

  const setField = useCallback((field, value) => {
    setLogin((state) => Object.assign({}, state, { [field]: value }));
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      postLogin(login.email, login.password)
        .then(dispatch)
        .then(() => {
          setIsLoading(false);
          history.push(redirect || '/');
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setField('error', message);
        });
    },
    [login.email, login.password, dispatch, history]
  );

  return { login, setField, onSubmit, isLoading };
};
