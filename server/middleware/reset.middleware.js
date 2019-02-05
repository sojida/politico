/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import db from '../database/config.db';
import queries from '../database/queries.db';

dotenv.config();

const localUrl = 'http://127.0.0.1:3000';
const herokuUrl = 'https://shielded-headland-63958.herokuapp.com';
const url = `${herokuUrl}`;

export default {
  validateEmail(req, res, next) {
    let verified = true;
    const error = [];
    const { email } = req.body;

    if (!email || !email.trim()) {
      verified = false;
      error.push({ email: 'email must be present' });
    }

    if (!(/^[a-z\d]+@[a-z]+\.(com|co)[a-z]+$/).test(email)) {
      verified = false;
      error.push({ email: 'email must be valid format: yorname@mail.com' });
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },

  async checkForEmail(req, res, next) {
    const { rows: email } = await db(queries.selectUserEmail(req.body.email));

    if (!email.length) {
      return res.status(404).json({
        status: 404,
        error: 'email not found',
      });
    }

    // eslint-disable-next-line prefer-destructuring
    req.user = email[0];
    return next();
  },

  async createToken(req, res, next) {
    const token = await jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    req.token = token;
    return next();
  },

  mailer(req, res) {
    const linkUrl = `${url}/api/v1/auth/reset/${req.token}/password`;
    const htmlBody = `<!DOCTYPE html>
      <html>

      <head>
          <title>Forget Password Email</title>
      </head>

      <body>
          <div>
              <h3>Dear ${req.user.firstname},</h3>
              <p>You requested for a password reset, kindly use this <a href="${linkUrl}">link</a> to reset your password</p>
              <br>
              <p>Cheers!</p>
          </div>

      </body>

      </html>`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: req.body.email,
      from: 'no-reply@politico.com',
      subject: 'Politico Pasword Reset',
      html: htmlBody,
    };
    // eslint-disable-next-line consistent-return
    sgMail.send(msg, false, (err, result) => {
      if (result) {
        return res.status(200).json({
          status: 200,
          data: [{
            message: 'Check your email for password reset link',
            email: req.body.email,
            token: req.token,
          }],
        });
      }
    });
  },

  async validateToken(req, res, next) {
    try {
      jwt.verify(req.params.token, process.env.JWT_SECRET);
      req.data = req.params.token;
    } catch (error) {
      if (error) {
        return res.status(406).json({
          status: 406,
          error: 'Oops, something went wrong',
        });
      }
    }

    return next();
  },

  acceptRequest(req, res) {
    res.status(200).redirect(`${url}/politico/reset.html?reset=${req.data}`);
  },

  validatePassword(req, res, next) {
    let verified = true;
    const error = [];
    const { password, password2 } = req.body;

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

  async verifyEmailToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'you need access',
      });
    }

    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = data;
    } catch (err) {
      if (err) {
        return res.status(403).json({
          status: 403,
          error: 'user authentication failed',
        });
      }
    }

    return next();
  },

  async isNotOldPassword(req, res, next) {
    const { rows: userEmail } = await db(queries.selectUserEmail(req.user.email));
    if (!userEmail.length) {
      return res.status(404).json({
        status: 404,
        error: 'this user does not exist',
      });
    }

    const oldPass = bcryptjs.compareSync(req.body.password, userEmail[0].password);

    if (oldPass) {
      return res.status(409).json({
        status: 409,
        error: 'You cannot use an old password',
      });
    }

    return next();
  },

  async updatePassword(req, res) {
    const hashPass = bcryptjs.hashSync(req.body.password, 10);

    const { rows: newPassword } = await db(queries.updatePassword(hashPass, req.user.email));

    if (newPassword.length) {
      res.status(200).json({
        status: 200,
        message: 'password reset successful',
      });
    }
  },
};
