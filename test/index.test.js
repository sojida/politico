/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);

describe('HOMEPAGE', () => {
  it('should respond with welcome title', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond with data', (done) => {
    chai.request(app)
      .get('/api/v1/images/file')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond with error: invalid routes', (done) => {
    chai.request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('check documentation, "/docs"');
        done();
      });
  });

  it('should respond with error: invalid routes', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('check documentation, "/docs"');
        done();
      });
  });
});
