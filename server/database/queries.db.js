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

const selectOffice = id => ({
  text: 'SELECT * FROM office WHERE id = $1',
  values: [id],
});

const selectParty = id => ({
  text: 'SELECT * FROM party WHERE id = $1',
  values: [id],
});


const selectCandidate = (id, officeId) => ({
  text: 'SELECT * FROM candidates WHERE candidate = $1 AND office = $2',
  values: [id, officeId],
});

const selectUser = id => ({
  text: 'SELECT * FROM users WHERE id = $1',
  values: [id],
});


export default {
  checkUser,
  createUser,
  loginUser,
  createCandidte,
  selectOffice,
  selectParty,
  selectCandidate,
  selectUser,
};
