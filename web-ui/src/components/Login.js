'use es6';

import React from 'react';
import { Alert, Container, Form, Button } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { login, setField, onSubmit, isLoading } = useLogin();
  return (
    <Container className="w-50">
      <h2 className="my-4">User Login</h2>
      {login.error ? <Alert variant="danger">{login.error}</Alert> : null}
      <Form onSubmit={onSubmit}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="text"
          onChange={({ target }) => setField('email', target.value)}
          value={login.email}
          className="mb-4"
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          onChange={({ target }) => setField('password', target.value)}
          value={login.password}
          className="mb-4"
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};
Login.displayName = 'Login';

export default Login;
