const queries = {


  checkUser: (email, phoneNumber) => ({
    text: 'SELECT * FROM users WHERE email = $1 OR phonenumber = $2',
    values: [email, phoneNumber],
  }),

  createUser: (
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
  }),

  loginUser: email => ({
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  }),

  createCandidte: (office, party, candidate) => ({
    text: 'INSERT INTO candidates(office, party, candidate) VALUES($1, $2, $3) RETURNING *',
    values: [office, party, candidate],
  }),

  selectOffice: name => ({
    text: 'SELECT * FROM office WHERE name = $1',
    values: [name],
  }),

  selectParty: name => ({
    text: 'SELECT * FROM party WHERE name = $1',
    values: [name],
  }),


  selectCandidate: (id, partyId) => ({
    text: 'SELECT * FROM candidates WHERE candidate = $1 OR party = $2',
    values: [id, partyId],
  }),

  checkCandidate: id => ({
    text: 'SELECT * FROM candidates WHERE id = $1',
    values: [id],
  }),

  checkOffice: id => ({
    text: 'SELECT * FROM office WHERE id = $1',
    values: [id],
  }),

  createVote: (createdon, createdby, office, candidate) => ({
    text: 'INSERT INTO vote(createdon, createdby, office, candidate) VALUES($1, $2, $3, $4) RETURNING *',
    values: [createdon, createdby, office, candidate],
  }),

  checkVote: (createdby, office) => ({
    text: 'SELECT * FROM vote WHERE createdby = $1 AND office = $2',
    values: [createdby, office],
  }),


};

export default queries;
