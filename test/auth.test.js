/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);

describe('REGISTER ', () => {
  it('should create new user', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Sam  Obi  Paul',
        email: 'obiwan@gmail.com',
        phoneNumber: '09010101010',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data[0]).to.have.property('token');
        expect(res.body.data[0]).to.have.property('user');
        const { user } = res.body.data[0];
        expect(user).to.have.property('firstname', 'Sam');
        expect(user).to.have.property('lastname', 'Obi');
        expect(user).to.have.property('othernames', 'Paul');
        expect(user).to.have.property('phonenumber');
        expect(user).to.have.property('isadmin', false);
      });
  });

  it('should not create new user: no fullname', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: ' ',
        email: 'obiwan@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('fullname');
      });
  });

  it('should not create new user: no fullname', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi ',
        email: 'obiwan@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('fullname');
      });
  });

  it('should not create new user: no email', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan ',
        email: ' ',
        phoneNumber: '09011111111',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
      });
  });

  it('should not create new user: invalid email format', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwangmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
      });
  });

  it('should not create new user: no phone number', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: ' ',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('phoneNumber');
      });
  });

  it('should not create new user: invalid phone number format', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: 'obiwan',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('phoneNumber');
      });
  });

  it('should not create new user: no password', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: '08011111111',
        password: ' ',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password');
      });
  });

  it('should not create new user: password do not match', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: '08011111111',
        password: '123456783',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password2');
      });
  });

  it('should not create new user: password is invalid (length)', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: '08011111111',
        password: '123456',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password');
      });
  });

  it('should not create new user: email already used', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obi@gmail.com',
        phoneNumber: '08022222222',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('That email has already been used');
      });
  });

  it('should not create new user: phonenumber already used', async () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan1@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        password2: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('That phonenumber has already been used');
      });
  });
});

describe('LOGIN ', () => {
  it('login user', async () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'obiwan@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('token');
        expect(res.body.data[0]).to.have.property('user');
        const { user } = res.body.data[0];
        expect(user).to.have.property('firstname');
        expect(user).to.have.property('lastname');
        expect(user).to.have.property('othernames');
        expect(user).to.have.property('phonenumber');
        expect(user).to.have.property('isadmin', false);
      });
  });

  it('login admin', async () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'obi@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('token');
        expect(res.body.data[0]).to.have.property('user');
        const { user } = res.body.data[0];
        expect(user).to.have.property('firstname');
        expect(user).to.have.property('lastname');
        expect(user).to.have.property('othernames');
        expect(user).to.have.property('phonenumber');
        expect(user).to.have.property('isadmin', true);
      });
  });

  it('should not login user: no email', async () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: ' ',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
      });
  });

  it('should not login user: invalid email format', async () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'obi*gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
      });
  });

  it('should not login user: no password', async () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sam@gmail.com',
        password: '  ',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password');
      });
  });

  it('should not login user: wrong password', async () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'obi@gmail.com',
        password: '1234567890',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('invalid details');
      });
  });

  it('should not login user: wrong email', async () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'obithatisnotthere@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('invalid details');
      });
  });
});
