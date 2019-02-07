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

describe('UPLOAD PROFILE PICTURE', () => {
  it('should send upload profile pic: invalid image format', (done) => {
    chai.request(app)
      .post('/api/v1/profile_pic')
      .set('Authorization', userToken)
      .attach('passporturl', './test/file.txt', 'file.txt')
      .end((err, res) => {
        expect(res.body.error[0]).to.have.property('passporturl');
        done();
      });
  });

  it('should send upload profile pic: no image present', (done) => {
    chai.request(app)
      .post('/api/v1/profile_pic')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body.error[0]).to.have.property('passporturl');
        done();
      });
  });

  it('should upload pic', (done) => {
    chai.request(app)
      .post('/api/v1/profile_pic')
      .set('Authorization', userToken)
      .attach('passporturl', './test/test.jpg', 'test.jpg')
      .end((err, res) => {
        expect(res.body.message).to.be.equal('upload successful');
        done();
      });
  });
});
