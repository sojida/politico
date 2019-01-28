const checkUser = (email, phoneNumber) => ({
  text: 'SELECT * FROM users WHERE email = $1 OR phonenumber = $2',
  values: [email, phoneNumber],
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

const loginUser = email => ({
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email],
});

const createCandidte = (office, party, candidate) => ({
  text: 'INSERT INTO candidates(office, party, candidate) VALUES($1, $2, $3) RETURNING *',
  values: [office, party, candidate],
});

const selectOffice = name => ({
  text: 'SELECT * FROM office WHERE name = $1',
  values: [name],
});

const selectParty = name => ({
  text: 'SELECT * FROM party WHERE name = $1',
  values: [name],
});


const selectCandidate = (id, partyId) => ({
  text: 'SELECT * FROM candidates WHERE candidate = $1 OR party = $2',
  values: [id, partyId],
});


export default {
  checkUser,
  createUser,
  loginUser,
  createCandidte,
  selectOffice,
  selectParty,
  selectCandidate,
};
