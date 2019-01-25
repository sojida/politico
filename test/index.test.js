/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);

describe('Homepage', () => {
  it('should respond with welcome title', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome to the politico API');
        done();
      });
  });

  it('should respond with error: invalid routes', (done) => {
    chai.request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('check documentation on routes');
        done();
      });
  });

  it('should respond with error: invalid routes', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('check documentation on routes');
        done();
      });
  });
});
