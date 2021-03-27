'use es6';

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useInviteForm } from '../hooks/useInviteForm';
import MaybeError from './MaybeError';

const InviteForm = () => {
  const {
    email,
    setEmail,
    isLoading,
    onSubmit,
    inviteLink,
    error,
  } = useInviteForm();
  return (
    <div className="my-4">
      <h4>Add attendee</h4>
      <MaybeError error={error} />
      <Form onSubmit={onSubmit} className="max-width-50p" inline>
        <Form.Control
          name="email"
          type="email"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          className="mr-2"
          required
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </Form>
      <div className="mt-2">
        To finish inviting users to the event, copy and share the below invite
        link.
      </div>
      <Form.Control type="text" value={inviteLink} disabled />
    </div>
  );
};
InviteForm.displayName = 'InviteForm';

export default InviteForm;
