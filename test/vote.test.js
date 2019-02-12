/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);


let userToken;

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

describe('VOTE', () => {
  it('should vote candidate', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: 1,
        office: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('office');
        expect(res.body.data).to.have.property('candidate');
        expect(res.body.data).to.have.property('voter');
        done();
      });
  });


  it('should not vote candidate: no such candidates', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: 1000,
        office: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('no such candidate');
        done();
      });
  });

  it('should not vote candidate: no such office', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: 1,
        office: 1000,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('no such office');
        done();
      });
  });

  it('should not vote candidate: body is string', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: '1',
        office: '0',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('error');
        done();
      });
  });

  it('should not vote candidate: no candidate', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        office: 0,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('candidate must be present');
        done();
      });
  });

  it('should not vote candidate: no office', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('office must be present');
        done();
      });
  });

  it('should not vote candidate: candidate alredy voted', (done) => {
    chai.request(app)
      .post('/api/v1/votes')
      .set('Authorization', userToken)
      .send({
        candidate: 1,
        office: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('you have already voted for this office');
        done();
      });
  });
});

describe('GET USER VOTES', () => {
  it('should return with users votes', (done) => {
    chai.request(app)
      .get('/api/v1/user_votes')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        if (res.body.data.length) {
          expect(res.body.data[0]).to.have.property('createdby');
          expect(res.body.data[0]).to.have.property('firstname');
          expect(res.body.data[0]).to.have.property('lastname');
          expect(res.body.data[0]).to.have.property('officename');
          expect(res.body.data[0]).to.have.property('partyname');
        }
        done();
      });
  });
});
