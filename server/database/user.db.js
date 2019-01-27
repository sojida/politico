const createUsersTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(40) NOT NULL,
            lastname VARCHAR(40) NOT NULL,
            othernames VARCHAR(40),
            passporturl VARCHAR(200),
            email VARCHAR(40) UNIQUE NOT NULL,
            phonenumber VARCHAR(40) UNIQUE NOT NULL,
            registered TIMESTAMP,
            password VARCHAR(100),
            isadmin BOOLEAN 
            
          )`;
  return text;
};

const dropUsersTable = () => 'DROP TABLE IF EXISTS users';

const deleteUser = id => ({
  text: 'DELETE FROM users WHERE id = $1',
  values: [id],
});

const createUser = (
  firstname,
  lastname,
  othernames,
  passporturl,
  phonenumber,
  email,
  registered,
  password,
  isadmin,
) => ({
  text: 'INSERT INTO users(firstname, lastname, othernames, passporturl, phonenumber, email, registered, password, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  // eslint-disable-next-line max-len
  values: [firstname, lastname, othernames, passporturl, phonenumber, email, registered, password, isadmin],
});

export default {
  createUsersTable,
  dropUsersTable,
  deleteUser,
  createUser,
};
