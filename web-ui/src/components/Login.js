'use es6';

import React from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { email, setEmail, password, setPassword, onSubmit } = useLogin();
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Form onSubmit={onSubmit} inline>
        <Form.Control
          name="name"
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
        />
        <Form.Control
          name="password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};
Login.displayName = 'Login';

export default Login;
