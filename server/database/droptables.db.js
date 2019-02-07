/* eslint-disable no-console */
import partyDb from './party.db';
import officeDb from './office.db';
import userDb from './user.db';
import candidatesDb from './candidates.db';
import voteDb from './vote.db';
import interestDb from './interest.db';
import db from './config.db';

async function dropAllTables() {
  await db(voteDb.dropVoteTable());
  await db(candidatesDb.dropCandidatesTable());
  await db(interestDb.dropInterestTable());
  await db(userDb.dropUsersTable());
  await db(officeDb.dropOfficeTable());
  await db(partyDb.dropPartyTable());
}

dropAllTables()
  .then(() => console.log('tables dropped'))
  .catch(err => console.log(err));

export default { dropAllTables };
