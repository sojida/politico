/* eslint-disable no-console */
import partyDb from './party.db';
import officeDb from './office.db';
import userDb from './user.db';
import candidatesDb from './candidates.db';
import voteDb from './vote.db';
import db from './config.db';
import creatTable from './createtable.db';

async function migrateData() {
  await db(partyDb.createParty('PCP', 'Lagos', 'logo123'));
  await db(partyDb.createParty('PCPC', 'Ibadan', 'logo123'));
  await db(partyDb.createParty('PCPD', 'Abuja', 'logo123'));
  await db(officeDb.createOffice('President', 'Federal'));
  await db(officeDb.createOffice('Senate', 'Federal'));
  await db(officeDb.createOffice('Chairman', 'Local'));
  await db(userDb.createUser('Chukes', 'Obi', 'Pete', 'logourl', '09011111111', 'obi@gmail.com', 'NOW', '12345678', 'true'));
  await db(userDb.createUser('Pete', 'Obi', 'Pete', 'logourl', '09011111112', 'pete@gmail.com', 'NOW', '12345678', 'false'));
  await db(userDb.createUser('Ade', 'Dan', 'Pete', 'logourl', '09011111113', 'dan@gmail.com', 'NOW', '12345678', 'false'));
  await db(userDb.createUser('Soji', 'Dan', 'Pete', 'logourl', '09011111114', 'soji@gmail.com', 'NOW', '12345678', 'false'));
  await db(userDb.createUser('Fred', 'Dan', 'Pete', 'logourl', '09011111115', 'fred@gmail.com', 'NOW', '12345678', 'false'));
  await db(candidatesDb.createCandidte(1, 1, 2));
  await db(candidatesDb.createCandidte(2, 2, 3));
  await db(voteDb.createVote('NOW', 1, 1, 1));
  await db(voteDb.createVote('NOW', 2, 2, 1));
  await db(voteDb.createVote('NOW', 3, 2, 2));
  await db(voteDb.createVote('NOW', 4, 1, 2));
  await db(voteDb.createVote('NOW', 5, 1, 1));
}

creatTable()
  .then(() => console.log('creating tables'))
  .then(() => migrateData())
  .then(() => console.log('migrating data'))
  .catch(err => console.log(err));
