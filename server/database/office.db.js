const createOfficeTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
            office(
              id SERIAL PRIMARY KEY,
              name VARCHAR(40) UNIQUE NOT NULL,
              type VARCHAR(40) NOT NULL
            )`;

  return text;
};

const dropOfficeTable = () => 'DROP TABLE IF EXISTS office';

const deleteOffice = id => ({
  text: 'DELETE FROM office WHERE id = $1',
  values: [id],
});

const createOffice = (name, type) => ({
  text: 'INSERT INTO office(name, type) VALUES($1, $2) RETURNING *',
  values: [name, type],
});

const getOfficeById = id => ({
  text: 'SELECT * FROM office WHERE id = $1',
  values: [id],
});

const getAllOffice = () => ({
  text: 'SELECT * FROM office',
});


export default {
  createOfficeTable,
  dropOfficeTable,
  deleteOffice,
  createOffice,
  getOfficeById,
  getAllOffice,
};
