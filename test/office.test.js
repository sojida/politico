/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);

let adminToken;
let userToken;

before('login admin', async () => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'obi@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      adminToken = res.body.data[0].token;
    });
});

before('login user', async () => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'pete@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userToken = res.body.data[0].token;
    });
});

describe('CREATE CANDEDATE', () => {
  it('should return created candidate', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: '1',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('office');
        expect(res.body.data).to.have.property('user');
      });
  });

  it('should return not return created candidate: no token', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .send({
        office: '1',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.have.equal('you need access');
      });
  });

  it('should return not return created candidate: wrong token values', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', 'this is not a token')
      .send({
        office: '1',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.have.equal('user authentication failed');
      });
  });

  it('should return not return created candidate: no office', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: ' ',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('office must be present');
      });
  });

  it('should return not return created candidate: no party', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: '1',
        party: ' ',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('party must be present');
      });
  });

  it('should return not return created candidate: no party', async () => {
    chai.request(app)
      .post('/api/v1/office/0/register')
      .set('Authorization', adminToken)
      .send({
        office: '1',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('user not found');
      });
  });

  it('should return not return created candidate: user in not admin', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', userToken)
      .send({
        office: '1',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.have.equal('This user is not an admin');
      });
  });

  it('should return not return created candidate: no such office', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: '0',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('no such office');
      });
  });

  it('should return not return created candidate: no such party', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: '1',
        party: '0',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('no such party');
      });
  });

  it('should return not return created candidate: user is already a candidate', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: '1',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.have.equal('user is already running for this office');
      });
  });
});
