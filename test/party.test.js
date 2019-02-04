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

describe('GET ALL PARTIES', () => {
  it('should respond with all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        if (data.length) {
          expect(data[0]).to.have.property('id');
          expect(data[0]).to.have.property('name');
          expect(data[0]).to.have.property('logourl');
        }
        done();
      });
  });
});

describe('GET A SPECIFIC PARTY', () => {
  it('should respond with a specific party', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('logourl');
        expect(data[0].id).to.equal(1);
        done();
      });
  });

  it('should not respond with a specific party: party not found', (done) => {
    chai.request(app)
      .get('/api/v1/parties/0')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(404);
        expect(error).to.equal('party not found');
        done();
      });
  });

  it('should not respond with a specific party: id is not number', (done) => {
    chai.request(app)
      .get('/api/v1/parties/a')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error).to.equal('id must be a number');
        done();
      });
  });
});

describe('Edit a party name', () => {
  it('should respond with the edited party name', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/1/name')
      .set('Authorization', adminToken)
      .send(
        {
          name: 'PDP',
        },
      )
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('logourl');
        expect(data[0].id).to.equal(1);
        expect(data[0].name).to.equal('PDP');
        done();
      });
  });

  it('should not respond with the edited party name: id is not a number', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/a/name')
      .set('Authorization', adminToken)
      .send(
        {
          name: 'PDP',
        },
      )
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error).to.equal('id must be a number');
        done();
      });
  });

  it('should not respond with the edited party name: id is not present', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/ /name')
      .set('Authorization', adminToken)
      .send(
        {
          name: 'PDP',
        },
      )
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error).to.equal('id must be present');
        done();
      });
  });

  it('should not respond with the edited party name: party not found', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/0/name')
      .set('Authorization', adminToken)
      .send(
        {
          name: 'PDP',
        },
      )
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(404);
        expect(error).to.equal('party not found');
        done();
      });
  });

  it('should not respond with the edited party name: name not present', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/0/name')
      .set('Authorization', adminToken)
      .send({})
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error).to.equal('name must be present');
        done();
      });
  });

  it('should not respond with the edited party name: name not present', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/1/name')
      .set('Authorization', userToken)
      .send({
        name: 'PDP',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(401);
        expect(error).to.equal('This user is not an admin');
        done();
      });
  });
});

describe('DELETE A PARTY', () => {
  it('should respond with a the deleted party and a message', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/3')
      .set('Authorization', adminToken)
      .end((err, res) => {
        const { status, data, message } = res.body;
        expect(status).to.equal(200);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('logourl');
        expect(data[0].id).to.equal(3);
        expect(message).to.equal(`${data[0].name} deleted successfully`);
        done();
      });
  });

  it('should not respond with a deleted party: party not found', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/0')
      .set('Authorization', adminToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(404);
        expect(error).to.equal('party not found');
        done();
      });
  });

  it('should not respond with a specific party: id is not number', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/a')
      .set('Authorization', adminToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error).to.equal('id must be a number');
        done();
      });
  });

  it('should not respond with a specific party: user token', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(401);
        expect(error).to.equal('This user is not an admin');
        done();
      });
  });
});

describe('CREATE A POLITICAL PARTY', () => {
  it('should respond with the created party', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: 'CPC',
        hqAddress: 'Lagos',
        logoUrl: 'logourl.png',
      })
      .end((err, res) => {
        const { status, data, message } = res.body;
        const { name, hqaddress, logourl } = data[0];
        expect(status).to.equal(201);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('hqaddress');
        expect(data[0]).to.have.property('logourl');
        expect(name).to.equal('CPC');
        expect(hqaddress).to.equal('Lagos');
        expect(logourl).to.equal('logourl.png');
        expect(message).to.equal('party created successfully');
        done();
      });
  });

  it('should respond with the created party: image included', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .field('name', 'CPCR')
      .field('hqAddress', 'Lagos')
      .attach('logoUrl', './test/test.jpg', 'test.jpg')
      .end((err, res) => {
        const { status, data, message } = res.body;
        const { name, hqaddress } = data[0];
        expect(status).to.equal(201);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('hqaddress');
        expect(data[0]).to.have.property('logourl');
        expect(name).to.equal('CPCR');
        expect(hqaddress).to.equal('Lagos');
        expect(message).to.equal('party created successfully');
        done();
      });
  });


  it('should not respond with the created party: no name', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: '',
        hqAddress: 'Lagos',
        logo: 'logourl.jpeg',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].name).to.equal('name must be present');
        done();
      });
  });

  it('should not respond with the created party: no hqAddress', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: 'CPC',
        hqAddress: '',
        logo: 'logourl.jpg',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].hqAddress).to.equal('hqAddress must be present');
        done();
      });
  });

  it('should not respond with the created party: name is number', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: '1',
        hqAddress: 'Lagos',
        logoUrl: 'logourl.jpg',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].name).to.equal('name should not be only numbers');
        done();
      });
  });

  it('should not respond with the created party: hqAddress is number', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: 'PCPEP',
        hqAddress: '1',
        logoUrl: 'logourl.jpg',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].hqAddress).to.equal('hqAddress should not be only numbers');
        done();
      });
  });

  it('should not respond with the created party: no logo', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: 'CPC',
        hqAddress: 'Lagos',
        logoUrl: '',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].logoUrl).to.equal('logo must be present');
        done();
      });
  });

  it('should not respond with the created party: invalid logo format', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: 'CPC',
        hqAddress: 'Lagos',
        logoUrl: 'logourl',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(400);
        expect(error[0].logoUrl).to.equal('invalid format');
        done();
      });
  });

  it('should not respond with the created party: party already exist', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', adminToken)
      .send({
        name: 'PCPC',
        hqAddress: 'Lagos',
        logoUrl: 'logourl.png',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(409);
        expect(error).to.equal('party already present');
        done();
      });
  });

  it('should not respond with the created party: user token', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', userToken)
      .send({
        name: 'YBNB',
        hqAddress: 'Lagos',
        logoUrl: 'logourl.png',
      })
      .end((err, res) => {
        const { status, error } = res.body;
        expect(status).to.equal(401);
        expect(error).to.equal('This user is not an admin');
        done();
      });
  });
});
