'use es6';

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCommentForm } from '../hooks/useCommentForm';
import MaybeError from './MaybeError';

const CommentForm = () => {
  const { comment, setComment, isLoading, onSubmit, error } = useCommentForm();
  return (
    <div className="my-4">
      <h4>Add a new comment</h4>
      <MaybeError error={error} />
      <Form onSubmit={onSubmit} className="max-width-50p">
        <Form.Control
          name="comment"
          as="textarea"
          onChange={({ target }) => setComment(target.value)}
          value={comment}
          className="mb-2"
          required
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
};
CommentForm.displayName = 'CommentForm';

export default CommentForm;
