const createPartyTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          party(
            id SERIAL PRIMARY KEY,
            name VARCHAR(40) UNIQUE NOT NULL,
            hqaddress VARCHAR(100) NOT NULL,
            logo VARCHAR(200) NOT NULL       
          )`;

  return text;
};

const dropPartyTable = () => 'DROP TABLE IF EXISTS party';

const deleteParty = id => ({
  text: 'DELETE FROM party WHERE id = $1',
  values: [id],
});

const createParty = (name, hqaddress, logo) => ({
  text: 'INSERT INTO party(name, hqaddress, logo) VALUES($1, $2, $3) RETURNING *',
  values: [name, hqaddress, logo],
});

const getPartyById = id => ({
  text: 'SELECT * FROM party WHERE id = $1',
  values: [id],
});

const getAllParty = () => ({
  text: 'SELECT * FROM party',
});


const updatePartyName = (id, newName) => ({
  text: 'UPDATE party SET name = $1 WHERE id = $2 RETURNING *',
  values: [newName, id],
});

export default {
  createPartyTable,
  dropPartyTable,
  deleteParty,
  createParty,
  getPartyById,
  getAllParty,
  updatePartyName,
};
