'use es6';

import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { RESPONSES } from '../data/invites';
import { useInviteTable } from '../hooks/useInviteTable';

const InviteRow = ({ id, user_email, response }) => {
  const { isEventOwner, onDelete } = useInviteTable(id);
  return (
    <tr>
      <td>{user_email}</td>
      <td>{response}</td>
      {isEventOwner ? (
        <td className="d-flex justify-content-center">
          <Button variant="outline-danger" onClick={onDelete}>
            Delete
          </Button>
        </td>
      ) : null}
    </tr>
  );
};
InviteRow.displayName = 'InviteRow';

const InviteTable = ({ invites }) => {
  const { isEventOwner } = useInviteTable();
  return (
    <Table striped bordered hover className="my-2">
      <thead>
        <tr>
          <th>Email</th>
          <th>Response</th>
          {isEventOwner ? <th></th> : null}
        </tr>
      </thead>
      <tbody>
        {Object.values(invites).map((invite) => (
          <InviteRow {...invite} key={invite.user_email} />
        ))}
      </tbody>
    </Table>
  );
};
InviteTable.displayName = 'InviteTable';

const ResponseCount = ({ response, count }) => (
  <div className="mx-2">
    {RESPONSES[response]}: {count}
  </div>
);
ResponseCount.displayName = 'ResponseCount';

const InviteSummary = ({ invites }) => (
  <div className="d-flex my-2">
    {Object.keys(RESPONSES).map((possibleResponse) => (
      <ResponseCount
        key={RESPONSES[possibleResponse]}
        response={possibleResponse}
        count={
          Object.values(invites).filter(
            ({ response }) => possibleResponse === `${response}`
          ).length
        }
      />
    ))}
  </div>
);
InviteSummary.displayName = 'InviteSummary';

const InviteList = ({ invites }) =>
  !invites ? null : (
    <div className="my-4">
      <h4>Invitations</h4>
      <InviteSummary invites={invites} />
      <InviteTable invites={invites} />
    </div>
  );
InviteList.displayName = 'InviteList';

export default InviteList;
