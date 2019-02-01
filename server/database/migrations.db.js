/* eslint-disable no-console */
import bcryptjs from 'bcryptjs';
import partyDb from './party.db';
import officeDb from './office.db';
import userDb from './user.db';
import candidatesDb from './candidates.db';
import voteDb from './vote.db';
import db from './config.db';
import creatTable from './createtable.db';

const password = bcryptjs.hashSync('12345678', 10);

async function migrateData() {
  await db(partyDb.createParty('PCP', 'Lagos', 'logo123'));
  await db(partyDb.createParty('PCPC', 'Ibadan', 'logo123'));
  await db(partyDb.createParty('PCPD', 'Abuja', 'logo123'));
  await db(partyDb.createParty('PCPF', 'Abuja', 'logo123'));
  await db(officeDb.createOffice('President', 'Federal'));
  await db(officeDb.createOffice('Senate', 'Federal'));
  await db(officeDb.createOffice('Chairman', 'Local'));
  await db(userDb.createUser('Chukes', 'Obi', 'Pete', 'logourl', '09011111111', 'obi@gmail.com', 'NOW', password, 'true'));
  await db(userDb.createUser('Pete', 'Obi', 'Pete', 'logourl', '09011111112', 'pete@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Ade', 'Dan', 'Pete', 'logourl', '09011111113', 'dan@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Soji', 'Dan', 'Pete', 'logourl', '09011111114', 'soji@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Fred', 'Dan', 'Pete', 'logourl', '09011111115', 'fred1@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Fred', 'Dan', 'Pete', 'logourl', '09011111116', 'fred2@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Fred', 'Dan', 'Pete', 'logourl', '09011111117', 'fred3@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Fred', 'Dan', 'Pete', 'logourl', '09011111118', 'fred4@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Fred', 'Dan', 'Pete', 'logourl', '09011111119', 'fred5@gmail.com', 'NOW', password, 'false'));
  await db(userDb.createUser('Fred', 'Dan', 'Pete', 'logourl', '09011111129', 'fred6@gmail.com', 'NOW', password, 'false'));
  await db(candidatesDb.createCandidate(1, 1, 2));
  await db(candidatesDb.createCandidate(1, 2, 3));
  await db(candidatesDb.createCandidate(2, 1, 4));
  await db(candidatesDb.createCandidate(2, 2, 5));
  await db(voteDb.createVote('NOW', 1, 1, 1));
  await db(voteDb.createVote('NOW', 1, 2, 3));
  await db(voteDb.createVote('NOW', 3, 1, 1));
  await db(voteDb.createVote('NOW', 3, 2, 3));
  await db(voteDb.createVote('NOW', 4, 1, 1));
  await db(voteDb.createVote('NOW', 4, 2, 3));
  await db(voteDb.createVote('NOW', 5, 1, 1));
  await db(voteDb.createVote('NOW', 5, 2, 3));
  await db(voteDb.createVote('NOW', 6, 1, 1));
  await db(voteDb.createVote('NOW', 6, 2, 3));
  await db(voteDb.createVote('NOW', 7, 1, 2));
  await db(voteDb.createVote('NOW', 7, 2, 4));
  await db(voteDb.createVote('NOW', 8, 1, 2));
  await db(voteDb.createVote('NOW', 8, 2, 4));
  await db(voteDb.createVote('NOW', 9, 1, 2));
  await db(voteDb.createVote('NOW', 9, 2, 4));
}

creatTable.createAllTables()
  .then(() => console.log('creating tables'))
  .then(() => migrateData())
  .then(() => console.log('migrating data'))
  .catch(err => console.log(err));

export default { creatTable, migrateData };
