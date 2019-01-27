/* eslint-disable no-console */
import partyDb from './party.db';
import officeDb from './office.db';
import userDb from './user.db';
import candidatesDb from './candidates.db';
import voteDb from './vote.db';
import db from './config.db';

async function createAllTables() {
  await db(partyDb.createPartyTable());
  await db(officeDb.createOfficeTable());
  await db(userDb.createUsersTable());
  await db(candidatesDb.createCandidatesTable());
  await db(voteDb.createVoteTable());
}


export default createAllTables;
