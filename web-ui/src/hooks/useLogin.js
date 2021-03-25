'use es6';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postLogin } from '../data/session';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { redirect } = useParams();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      postLogin(email, password)
        .then(dispatch)
        .then(() => {
          setIsLoading(false);
          history.push(redirect || '/');
        });
    },
    [email, password, dispatch, history]
  );

  return { email, setEmail, password, setPassword, onSubmit, isLoading };
};
