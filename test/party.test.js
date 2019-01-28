/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';


chai.use(chaiHttp);

describe('Get all parties', () => {
  it('should respond with all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        const { status, data } = res.body;
        expect(status).to.equal(200);
        if (data.length) {
          expect(data[0]).to.have.property('id');
          expect(data[0]).to.have.property('name');
          expect(data[0]).to.have.property('logoUrl');
        }
        done();
      });
  });
});
