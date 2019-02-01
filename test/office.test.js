/* eslint-disable no-console */
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


describe('GET ALL OFFICES', () => {
  it('should respond with all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        if (data.length) {
          expect(data[0]).to.have.property('id');
          expect(data[0]).to.have.property('type');
          expect(data[0]).to.have.property('name');
        }
        done();
      });
  });
});

describe('GET A SPECIFIC OFFICE', () => {
  it('should respond with a specific office', (done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('type');
        expect(data[0]).to.have.property('name');
        expect(data[0].id).to.equal(1);
        done();
      });
  });

  it('should not respond with a specific office: office not found', (done) => {
    chai.request(app)
      .get('/api/v1/offices/0')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(404);
        expect(error).to.equal('office not found');
        done();
      });
  });

  it('should not respond with a specific office: id is not number', (done) => {
    chai.request(app)
      .get('/api/v1/offices/a')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error).to.equal('id must be a number');
        done();
      });
  });
});

describe('CREATE OFFICE', () => {
  it('should respond with the created office', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', adminToken)
      .send({
        name: 'Chief Justice',
        type: 'Federal',
      })
      .end((err, res) => {
        const { status, data, message } = res.body;
        expect(status).to.equal(201);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('type');
        expect(message).to.equal('office created successfully');
        done();
      });
  });

  it('should not respond with the created office: no name', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', adminToken)
      .send({
        name: '',
        type: 'Federal',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].name).to.equal('name must be present');
        done();
      });
  });

  it('should not respond with the created office: no type', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', adminToken)
      .send({
        name: 'Senate',
        type: '',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].type).to.equal('type must be present');
        done();
      });
  });

  it('should not respond with the created office: name is number', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', adminToken)
      .send({
        name: '1',
        type: 'Federal',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].name).to.equal('name should not be only numbers');
        done();
      });
  });

  it('should not respond with the created office: type is number', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', adminToken)
      .send({
        name: 'President',
        type: '1',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[1].type).to.equal('type should not be only numbers');
        done();
      });
  });


  it('should not respond with the created office: wrong type', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', adminToken)
      .send({
        name: 'Senate',
        type: 'Mayor',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].type).to.equal('please specify a valid type: Federal, State, Local or Legislative');
        done();
      });
  });

  it('should not respond with the created office: office already exist', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', adminToken)
      .send({
        name: 'President',
        type: 'Federal',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(409);
        expect(error).to.equal('office already present');
        done();
      });
  });

  it('should not respond with the created office: user token', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('Authorization', userToken)
      .send({
        name: 'President',
        type: 'Federal',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(401);
        expect(error).to.equal('This user is not an admin');
        done();
      });
  });
});


describe('CREATE CANDIDATE', () => {
  it('should return created candidate', (done) => {
    chai.request(app)
      .post('/api/v1/office/6/register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
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

  it('should return not return created candidate: no token', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.have.equal('you need access');
        done();
      });
  });

  it('should return not return created candidate: wrong token values', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', 'this is not a token')
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.have.equal('user authentication failed');
        done();
      });
  });

  it('should return not return created candidate: user in not admin', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', userToken)
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.have.equal('This user is not an admin');
        done();
      });
  });

  it('should return not return created candidate: no such office', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
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

  it('should return not return created candidate: no such party', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
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

  it('should return not return created candidate: user already running for that office', (done) => {
    chai.request(app)
      .post('/api/v1/office/2/register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.have.equal('user or party is already running for this office');
        done();
      });
  });

  it('should return not return created candidate: no office', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
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

  it('should return not return created candidate: no party', (done) => {
    chai.request(app)
      .post('/api/v1/office/5/register')
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
      .post('/api/v1/office/ /register')
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

  it('should return not return created candidate: id is not number', (done) => {
    chai.request(app)
      .post('/api/v1/office/a/register')
      .set('Authorization', adminToken)
      .send({
        office: 1,
        party: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.have.equal('id must be a number');
        done();
      });
  });

  it('should return not return created candidate: body is string', (done) => {
    chai.request(app)
      .post('/api/v1/office/6/register')
      .set('Authorization', adminToken)
      .send({
        office: '1',
        party: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.have.property('error');
        done();
      });
  });
});

describe('VOTE RESULTS', () => {
  it('should return results of votes', (done) => {
    chai.request(app)
      .post('/api/v1/office/1/result')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('office');
        expect(res.body.data[0]).to.have.property('candidate');
        expect(res.body.data[0]).to.have.property('results');
        done();
      });
  });

  it('should not return results of votes: no such office', (done) => {
    chai.request(app)
      .post('/api/v1/office/0/result')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('no such office');
        done();
      });
  });

  it('should not return results of votes: params is not a number', (done) => {
    chai.request(app)
      .post('/api/v1/office/a/result')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('id must be a number');
        done();
      });
  });

  it('should not return results of votes: params is not present', (done) => {
    chai.request(app)
      .post('/api/v1/office/ /result')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('id must be present');
        done();
      });
  });
});
