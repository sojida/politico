/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);

describe('REGISTER ', () => {
  it('should create new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Sam  Obi  Paul',
        email: 'obiwan@gmail.com',
        phoneNumber: '09010101010',
        password: '12345678',
        confirmPassword: '12345678',
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
        done();
      });
  });

  it('should not create new user: no fullname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: ' ',
        email: 'obiwan@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('fullname');
        done();
      });
  });

  it('should not create new user: invalid full name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: '123 456',
        email: 'obiwan@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('fullname');
        done();
      });
  });

  it('should not create new user: no fullname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi ',
        email: 'obiwan@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('fullname');
        done();
      });
  });

  it('should not create new user: no email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan ',
        email: ' ',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
        done();
      });
  });

  it('should not create new user: invalid email format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwangmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
        done();
      });
  });

  it('should not create new user: no phone number', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: ' ',
        password: '12345678',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('phoneNumber');
        done();
      });
  });

  it('should not create new user: invalid phone number format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: 'obiwan',
        password: '12345678',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('phoneNumber');
        done();
      });
  });

  it('should not create new user: no password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: '08011111111',
        password: ' ',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password');
        done();
      });
  });

  it('should not create new user: password do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: '08011111111',
        password: '123456783',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('confirmPassword');
        done();
      });
  });

  it('should not create new user: password is invalid (length)', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan@gmail.com',
        phoneNumber: '08011111111',
        password: '123456',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password');
        done();
      });
  });

  it('should not create new user: email already used', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obi@gmail.com',
        phoneNumber: '08022222222',
        password: '12345678',
        confirmPassword: '12345678',

      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('That email has already been used');
        done();
      });
  });

  it('should not create new user: phonenumber already used', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Obi Wan',
        email: 'obiwan1@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('That phonenumber has already been used');
        done();
      });
  });

  it('should not create new user: body property is number', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 2,
        email: 'obiwan1@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('error');
        done();
      });
  });

  it('should not create new user: fullname property is not present', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'obiwan1@gmail.com',
        phoneNumber: '09011111111',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('fullname');
        done();
      });
  });
});

describe('LOGIN ', () => {
  it('login user', (done) => {
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
        done();
      });
  });

  it('login admin', (done) => {
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
        done();
      });
  });

  it('should not login user: no email', (done) => {
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
        done();
      });
  });

  it('should not login user: invalid email format', (done) => {
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
        done();
      });
  });

  it('should not login user: no password', (done) => {
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
        done();
      });
  });

  it('should not login user: wrong password', (done) => {
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
        done();
      });
  });

  it('should not login user: wrong email', (done) => {
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
        done();
      });
  });
});
