'use es6';

import React from 'react';
import { Table } from 'react-bootstrap';
import { RESPONSES } from '../data/invites';

const InviteRow = () => {};
InviteRow.displayName = 'InviteRow';

const InviteTable = ({ invites }) => {
  return (
    <Table striped bordered hover>
      {Object.values(invites).map((invite) => (
        <InviteRow invite={invite} key={invite.user_email} />
      ))}
    </Table>
  );
};
InviteTable.displayName = 'InviteTable';

const ResponseCount = ({ response, count }) => (
  <div>
    {RESPONSES[response]}: {count}
  </div>
);
ResponseCount.displayName = 'ResponseCount';

const InviteSummary = (invites) => {
  return (
    <div className="d-flex">
      {Object.values(RESPONSES).map((possibleResponse) => (
        <ResponseCount
          response={possibleResponse}
          count={
            Object.values(invites).filter(
              ({ response }) => possibleResponse === response
            ).length
          }
        />
      ))}
    </div>
  );
};
InviteSummary.displayName = 'InviteSummary';

const InviteList = ({ invites }) => {
  return !invites ? null : (
    <div>
      <h4>Invitations</h4>
      <InviteSummary invites={invites} />
      <InviteTable invites={invites} />
    </div>
  );
};
InviteList.displayName = 'InviteList';

export default InviteList;
