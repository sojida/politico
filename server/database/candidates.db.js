const createCandidatesTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
            candidates(
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

const dropCandidatesTable = () => 'DROP TABLE IF EXISTS candidates';

const deleteCandidates = id => ({
  text: 'DELETE FROM candidates WHERE id = $1',
  values: [id],
});

const createCandidte = (office, party, candidate) => ({
  text: 'INSERT INTO candidates(office, party, candidate) VALUES($1, $2, $3) RETURNING *',
  values: [office, party, candidate],
});

export default {
  createCandidatesTable,
  dropCandidatesTable,
  deleteCandidates,
  createCandidte,
};
