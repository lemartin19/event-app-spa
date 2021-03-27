'use es6';

import React from 'react';
import { RESPONSES } from '../data/invites';
import { Button, Form } from 'react-bootstrap';
import { useRsvpForm } from '../hooks/useRsvpForm';
import MaybeError from './MaybeError';

const ResponseCheckbox = ({ value, setResponse }) => (
  <Form.Check
    name={'response'}
    label={value}
    type="radio"
    onChange={() => setResponse(value)}
    className="mr-4"
    inline
  />
);
ResponseCheckbox.displayName = 'ResponseCheckbox';

const RsvpForm = () => {
  const { isInvitee, setResponse, onSubmit, isLoading, error } = useRsvpForm();
  return !isInvitee ? null : (
    <div>
      <h4>Respond to invite</h4>
      <MaybeError error={error} />
      <Form onSubmit={onSubmit} className="max-width-50p" inline>
        <Form.Group>
          {Object.keys(RESPONSES)
            .filter((response) => response !== 'null')
            .map((response) => (
              <ResponseCheckbox
                value={response}
                setResponse={setResponse}
                key={response}
              />
            ))}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'RSVP'}
        </Button>
      </Form>
    </div>
  );
};
RsvpForm.displayName = 'RsvpForm';

export default RsvpForm;
