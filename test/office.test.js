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
