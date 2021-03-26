'use es6';

import React from 'react';
import moment from 'moment';
import { Button, Card } from 'react-bootstrap';
import { useComment } from '../hooks/useComment';

const Comment = ({ comment }) => {
  const { postedBy, postedAt, body, onDelete } = useComment(comment);
  return (
    <Card className="my-3">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <Card.Text>{body}</Card.Text>
          <footer className="d-flex blockquote-footer">
            <div className="font-weight-bold">{postedBy}</div>
            <div className="mx-3 font-italic">{postedAt}</div>
            {onDelete ? (
              <Button variant="outline-danger" onClick={onDelete}>
                Delete
              </Button>
            ) : null}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};
Comment.displayName = 'Comment';

const CommentList = ({ comments }) => (
  <div className="my-4">
    <h4>Comments</h4>
    {comments
      ? [...comments]
          .sort(
            (a, b) =>
              moment(a.inserted_at).format('YYYYMMDDHHmmSS') -
              moment(b.inserted_at).format('YYYYMMDDHHmmSS')
          )
          .map((comment, idx) => <Comment comment={comment} key={idx} />)
      : null}
  </div>
);
CommentList.displayName = 'CommentList';

export default CommentList;
