const createVoteTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              vote(
                id SERIAL PRIMARY KEY,
                createdon TIMESTAMP NOT NULL,
                createdby INTEGER NOT NULL,
                office INTEGER NOT NULL,
                candidate INTEGER NOT NULL,   
                FOREIGN KEY (createdby) REFERENCES users (id) ON DELETE CASCADE,   
                FOREIGN KEY (office) REFERENCES office (id) ON DELETE CASCADE,   
                FOREIGN KEY (candidate) REFERENCES candidates (id) ON DELETE CASCADE
              )`;

  return text;
};

const dropVoteTable = () => 'DROP TABLE IF EXISTS vote';

const deleteVote = id => ({
  text: 'DELETE FROM vote WHERE id = $1',
  values: [id],
});

const createVote = (createdon, createdby, office, candidate) => ({
  text: 'INSERT INTO vote(createdon, createdby, office, candidate) VALUES($1, $2, $3, $4) RETURNING *',
  values: [createdon, createdby, office, candidate],
});

export default {
  createVoteTable,
  dropVoteTable,
  deleteVote,
  createVote,
};
