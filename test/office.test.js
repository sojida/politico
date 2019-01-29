/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);


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
