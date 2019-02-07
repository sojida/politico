const createInterestTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              interest(
                id SERIAL PRIMARY KEY,
                office INTEGER NOT NULL,
                party INTEGER NOT NULL,
                candidate INTEGER NOT NULL,   
                FOREIGN KEY (office) REFERENCES office (id) ON DELETE CASCADE,   
                FOREIGN KEY (party) REFERENCES party (id) ON DELETE CASCADE,   
                FOREIGN KEY (candidate) REFERENCES users (id) ON DELETE CASCADE
              )`;

  return text;
};

const dropInterestTable = () => 'DROP TABLE IF EXISTS interest';

const deleteIntrestee = id => ({
  text: 'DELETE FROM interest WHERE id = $1',
  values: [id],
});

const createInterestee = (office, party, candidate) => ({
  text: 'INSERT INTO interest(office, party, candidate) VALUES($1, $2, $3) RETURNING *',
  values: [office, party, candidate],
});

const getIntresteeByOffice = office => ({
  text: 'SELECT * FROM interest WHERE office = $1',
  values: [office],
});

const getAllIntrestee = officeid => ({
  text: `select interest.id, interest.party, party.name as partyname, interest.office, office.name as officename, interest.candidate, users.firstname, users.lastname
    from interest, party, office, users
    where 
    interest.office = $1 and
    interest.party = party.id and
    interest.office = office.id and
    interest.candidate = users.id
    group by interest.id, interest.party, party.name, interest.office, office.name, interest.candidate, users.firstname, users.lastname`,
  values: [officeid],
});

export default {
  createInterestTable,
  dropInterestTable,
  deleteIntrestee,
  createInterestee,
  getIntresteeByOffice,
  getAllIntrestee,
};
