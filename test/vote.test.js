/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);


let userToken;

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

describe('VOTE', () => {
  it('should vote candidate', async () => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: '3',
        office: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('office');
        expect(res.body.data).to.have.property('candidate');
        expect(res.body.data).to.have.property('voter');
      });
  });

  it('should not vote candidate: no candidate specified', async () => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: ' ',
        office: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('candidate must be present');
      });
  });

  it('should not vote candidate: no office specified', async () => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: '1',
        office: ' ',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('office must be present');
      });
  });

  it('should not vote candidate: no such candidates', async () => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: '0',
        office: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('no such candidate');
      });
  });

  it('should not vote candidate: no such office', async () => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: '1',
        office: '0',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('no such office');
      });
  });

  it('should not vote candidate: candidate alredy voted', async () => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: '1',
        office: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('you have already voted for this office');
      });
  });
});
