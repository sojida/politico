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


describe('Get all offices', () => {
  it('should respond with all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
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

describe('Get a specific office', () => {
  it('should respond with a specific office', (done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
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
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error).to.equal('id must be a number');
        done();
      });
  });
});

describe('Create office', () => {
  it('should respond with the created office', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        name: 'Senate',
        type: 'Federal',
      })
      .end((err, res) => {
        const { status, data, message } = res.body;
        const { name, type } = data[0];
        expect(status).to.equal(201);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('type');
        expect(name).to.equal('Senate');
        expect(type).to.equal('Federal');
        expect(message).to.equal('office created successfully');
        done();
      });
  });

  it('should not respond with the created office: no name', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
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
});


describe('VERIFY TOKEN', () => {
  it('should return created candidate', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: 'President',
        party: 'PCPD',
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
        office: 'President',
        party: 'PCP',
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
        office: 'President',
        party: 'PCP',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.have.equal('user authentication failed');
      });
  });

  it('should return not return created candidate: user in not admin', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', userToken)
      .send({
        office: 'President',
        party: 'PCP',
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
        office: 'Labour Prefect',
        party: 'PCP',
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
        office: 'President',
        party: 'no shuch party',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.have.equal('no such party');
      });
  });

  it('should return not return created candidate: no such party', async () => {
    chai.request(app)
      .post('/api/v1/office/5/register')
      .set('Authorization', adminToken)
      .send({
        office: 'President',
        party: 'PCP',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.have.equal('user or party is already running for this office');
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
        expect(res.body.data[0]).to.have.property('result');
        done();
      });
  });

  it('should return results of votes', async () => {
    chai.request(app)
      .post('/api/v1/office/1/result')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('office');
        expect(res.body.data[0]).to.have.property('candidate');
        expect(res.body.data[0]).to.have.property('result');
      });
  });

  it('should not return results of votes: no such office', async () => {
    chai.request(app)
      .post('/api/v1/office/1/result')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('no such office');
      });
  });

  it('should not return results of votes: no candidate for that office', async () => {
    chai.request(app)
      .post('/api/v1/office/3/result')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('no candidate is running for that office');
      });
  });
});
