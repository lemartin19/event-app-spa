'use es6';

import React from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNewUser } from '../hooks/useNewUser';

const NewUser = () => {
  const { user, setField, onSubmit, isLoading } = useNewUser();

  return (
    <Container>
      <h2 className="my-4">Create new user</h2>
      {user.error ? <Alert variant="danger">{user.error}</Alert> : null}
      <Form onSubmit={onSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={({ target }) => setField('username', target.value)}
          value={user.username}
          className="mb-4"
          required
        />
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          onChange={({ target }) => setField('email', target.value)}
          value={user.email}
          className="mb-4"
          required
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password1"
          type="password"
          onChange={({ target }) => setField('password1', target.value)}
          value={user.password1}
          className="mb-4"
          required
        />
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          name="password2"
          type="password"
          onChange={({ target }) => setField('password2', target.value)}
          value={user.password2}
          className="mb-4"
          required
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};
NewUser.displayName = 'NewUser';

export default NewUser;
