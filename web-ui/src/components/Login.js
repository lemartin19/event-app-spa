'use es6';

import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { email, setEmail, password, setPassword, onSubmit } = useLogin();
  return (
    <Container className="w-50">
      <Form onSubmit={onSubmit}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          className="mb-4"
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          className="mb-4"
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
