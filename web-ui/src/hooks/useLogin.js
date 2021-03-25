'use es6';

import { useState, useCallback } from 'react';
import { postLogin } from '../data/session';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      postLogin(email, password);
    },
    [email, password]
  );

  return { email, setEmail, password, setPassword, onSubmit };
};
