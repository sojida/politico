/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);
let emailToken;

before('register user', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send({
      fullname: 'soji dan',
      email: 'adesojitest22@gmail.com',
      phoneNumber: '09011122433',
      password: '12345678',
      confirmPassword: '12345678',
    })
    .end(done());
});

describe('RESET PASSWORD', () => {
  it('should invalid email input : no email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: ' ',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
        done();
      });
  });

  it('should invalid email input : invalid format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'wedemmail.com',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('email');
        done();
      });
  });

  it('should invalid email input : email not found', (done) => {
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'nouser@mail.com',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('email not found');
        done();
      });
  });

  it('should respond with mail and message', (done) => {
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'adesojitest22@gmail.com',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('message', 'Check your email for password reset link');
        expect(res.body.data[0]).to.have.property('email', 'adesojitest22@gmail.com');
        emailToken = res.body.data[0].token;
        done();
      });
  });

  it('should respond with error for invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/auth/reset/invalidToken/password')
      .end((err, res) => {
        expect(res.body.status).to.equal(406);
        expect(res.body.error).to.have.equal('Oops, something went wrong');
        done();
      });
  });

  it('should respond token', (done) => {
    chai.request(app)
      .get(`/api/v1/auth/reset/${emailToken}/password`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return error for invalid password format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/new_password')
      .set('Authorization', emailToken)
      .send({
        password: '12345',
        password2: '12345',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password');
        done();
      });
  });

  it('should return error for invalid password: password do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/new_password')
      .set('Authorization', emailToken)
      .send({
        password: '12345678',
        password2: '123456788',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('password2');
        done();
      });
  });

  it('should return error for invalid password: no token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/new_password')
      .send({
        password: '12345678',
        password2: '12345678',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.have.equal('you need access');
        done();
      });
  });

  it('should return error for password reset: invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/new_password')
      .set('Authorization', 'this is not a valid token')
      .send({
        password: '12345678',
        password2: '12345678',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.have.equal('user authentication failed');
        done();
      });
  });

  it('should return error for invalid password: old password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/new_password')
      .set('Authorization', emailToken)
      .send({
        password: '12345678',
        password2: '12345678',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.have.equal('You cannot use an old password');
        done();
      });
  });

  it('should return with success password updated', (done) => {
    chai.request(app)
      .post('/api/v1/auth/new_password')
      .set('Authorization', emailToken)
      .send({
        password: '987654321',
        password2: '987654321',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.have.equal('password reset successful');
        done();
      });
  });
});
