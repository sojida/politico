import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helper from '../helper/auth.helper';
import db from '../database/config.db';
import queries from '../database/queries.db';

const { emailPattern } = {
  emailPattern: /^[a-z\d]+@[a-z]+\.(com|co)[a-z]+$/,
};

const validations = {
  validateRegister(req, res, next) {
    let verified = true;
    const error = [];

    const {
      fullname, email, phoneNumber, password, password2,
    } = req.body;
    const names = helper.seperateNames(fullname);

    if (!fullname || !fullname.trim()) {
      verified = false;
      error.push({ fullname: 'fullname must be present' });
    }

    if (!names) {
      verified = false;
      error.push({ fullname: 'more than one name is required' });
    }

    if (!email || !email.trim()) {
      verified = false;
      error.push({ email: 'email must be present' });
    }

    if (!(emailPattern.test(email))) {
      verified = false;
      error.push({ email: 'email must be valid format: yorname@mail.com' });
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      verified = false;
      error.push({ phoneNumber: 'phone number must be present' });
    }

    if (!(/^[\d]{11}$/.test(phoneNumber))) {
      verified = false;
      error.push({ phoneNumber: 'phone number must be valid' });
    }

    if (!(/^[\w@-]{8,}$/.test(password))) {
      verified = false;
      error.push({ password: 'password should be more than 8 characters and can have uppercase, lowercase, numbers, "@" and "-" ' });
    }


    if (password !== password2) {
      verified = false;
      error.push({ password2: 'password do not match' });
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },

  async isUserPresent(req, res, next) {
    const { rows } = await db(queries.checkUser(
      req.body.email,
      req.body.phoneNumber,
    ));

    if (rows.length) {
      if (rows[0].email === req.body.email) {
        return res.status(409).json({
          status: 409,
          error: 'That email has already been used',
        });
      }

      if (rows[0].phonenumber === req.body.phoneNumber) {
        return res.status(409).json({
          status: 409,
          error: 'That phonenumber has already been used',
        });
      }
    }

    return next();
  },

  validateLogin(req, res, next) {
    let verified = true;
    const error = [];

    const { email, password } = req.body;

    if (!(emailPattern.test(email))) {
      verified = false;
      error.push({ email: 'email must be valid format: yorname@mail.com' });
    }


    if (!email || !email.trim()) {
      verified = false;
      error.push({ email: 'email is required' });
    }


    if (!password || !password.trim()) {
      verified = false;
      error.push({ password: 'password is required' });
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },


  async checkDetails(req, res, next) {
    const { rows } = await db(queries.loginUser(req.body.email));


    if (!rows.length) {
      return res.status(400).json({
        status: 400,
        error: 'invalid details',
      });
    }

    const token = jwt.sign(rows[0], process.env.JWT_SECRET, { expiresIn: '1d' });
    const pass = bcryptjs.compareSync(req.body.password, rows[0].password);
    delete rows[0].password;


    if (!pass) {
      return res.status(400).json({
        status: 400,
        error: 'invalid details',
      });
    }

    req.data = {
      token,
      user: rows[0],
    };

    return next();
  },

  async createUser(req, res, next) {
    const names = helper.seperateNames(req.body.fullname);
    const password = bcryptjs.hashSync(req.body.password, 10);

    const userDetails = {
      firstname: names[0],
      lastname: names[1],
      othername: names[2],
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password,
    };

    const { rows } = await db(queries.createUser(userDetails.firstname, userDetails.lastname, userDetails.othername, 'null', userDetails.phoneNumber, userDetails.email, 'NOW', password, false));
    delete rows[0].password;

    const token = jwt.sign(rows[0], process.env.JWT_SECRET, { expiresIn: '1d' });

    req.data = {
      token,
      user: rows[0],
    };

    return next();
  },

  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'you need access',
      });
    }

    const data = await jwt.verify(token, process.env.JWT_SECRET);

    if (!data) {
      return res.status(404).json({
        status: 404,
        error: 'you need access',
      });
    }

    req.data = data;
    return next();
  },

};


export default validations;
