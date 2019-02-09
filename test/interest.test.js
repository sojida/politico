/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);

let adminToken;
let userToken;

before('login admin', (done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'obi@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      done();
    });
});

before('login user', (done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'pete@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userToken = res.body.data[0].token;
      done();
    });
});

describe('GET ALL INTESTEES', () => {
  it('should respond with all intrestees', (done) => {
    chai.request(app)
      .get('/api/v1/interest/1')
      .set('Authorization', adminToken)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        if (data.length) {
          expect(data[0]).to.have.property('candidate');
          expect(data[0]).to.have.property('office');
          expect(data[0]).to.have.property('party');
        }
        done();
      });
  });

  it('should not respond with all intrestees: not an admin', (done) => {
    chai.request(app)
      .get('/api/v1/interest/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(401);
        expect(error).to.equal('This user is not an admin');
        done();
      });
  });
});


describe('GET ALL CANDIDATES', () => {
  it('should not respond with all candidates', (done) => {
    chai.request(app)
      .get('/api/v1/candidates/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        if (data.length) {
          expect(data[0]).to.have.property('candidate');
          expect(data[0]).to.have.property('office');
          expect(data[0]).to.have.property('party');
        }
        done();
      });
  });
});


describe('CREATE INTEREST', () => {
  it('should return created interest', (done) => {
    chai.request(app)
      .post('/api/v1/interest/1/register')
      .set('Authorization', adminToken)
      .send({
        office: 2,
        party: 4,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('office');
        expect(res.body.data).to.have.property('user');
        done();
      });
  });

  it('should return not return created interest: no such office', (done) => {
    chai.request(app)
      .post('/api/v1/interest/5/register')
      .set('Authorization', adminToken)
      .send({
        office: 1000,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('no such office');
        done();
      });
  });

  it('should return not return created interest: no such party', (done) => {
    chai.request(app)
      .post('/api/v1/interest/5/register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
        party: 1000,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('no such party');
        done();
      });
  });

  it('should return not return created interest: no such user', (done) => {
    chai.request(app)
      .post('/api/v1/interest/5000/register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('no user found');
        done();
      });
  });

  it('should return not return created interest: user already running for that office', (done) => {
    chai.request(app)
      .post('/api/v1/interest/2/register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.have.equal('user or party is already interested in this office');
        done();
      });
  });

  it('should return not return created interest: no office', (done) => {
    chai.request(app)
      .post('/api/v1/interest/5/register')
      .set('Authorization', adminToken)
      .send({
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('office must be present');
        done();
      });
  });

  it('should return not return created interest: no party', (done) => {
    chai.request(app)
      .post('/api/v1/interest/5/register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('party must be present');
        done();
      });
  });

  it('should return not return created candidate: id is not present', (done) => {
    chai.request(app)
      .post('/api/v1/interest/ /register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('id must be present');
        done();
      });
  });
});
