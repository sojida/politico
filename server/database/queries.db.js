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


export default {
  checkUser,
  createUser,
  loginUser,
};
