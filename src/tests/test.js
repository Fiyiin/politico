/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';
import dotenv from 'dotenv';

import app from '../app';

process.env.NODE_ENV = 'test';

dotenv.config();

let userToken;
let adminToken;


describe('Politico api landing page', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('should return a status code of 200 and a welcome message', (done) => {
    request(app)
      .get('/api/v1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ message: 'Welcome to Politico' });
      })
      .end(done);
  });
});


describe('Test for Invalid URL', () => {
  it('Should return status code 404 and error message', (done) => {
    request(app)
      .get('/api')
      .expect(404)
      .end((error, res) => {
        expect(res.body.error).toEqual('Not found! Check that you have the correct url');
        done();
      });
  });
});

describe('Tests for adminuser endpoints', () => {
  describe('Test for Signup', () => {
    it('should return 409 for conflict', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'bimbo',
          lastname: 'Grace',
          othername: '',
          email: 'grade@gradient.com',
          password: 'victor0',
          phoneNumber: '094832783',
          passportUrl: 'bimbo.gif',
          isAdmin: true,
        })
        .expect(409, done);
    });
  });
  it('should return 400 for invalid inputs', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: '',
        othername: '',
        email: 'grade@gradient.com',
        password: 'victor0',
        phoneNumber: '094832783',
        passportUrl: 'bimbo.gif',
        isAdmin: true,
      })
      .expect(400, done);
  });
});

describe('Generate Token for testing Endpoints', () => {
  /*it('should return token for user successful login', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'grade@gradient.com',
        password: 'victor0',
      })
      .expect(200)
      .end((error, res) => {
        userToken = res.body.token;
        done();
      });
  });*/
  /*it('should return token for admin successful login', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'grade@gradient.com',
        password: 'victor0',
      })
      .expect(200, done)
  });*/
});


describe('Test for Login', () => {
  it('should return 400 for invalid inputs', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'grade@gradient.com',
        password: '',
      })
      .expect(400, done)
  });
  it('should return 400 if the email does not exist', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'grade@gradien.com',
        password: 'victor0',
      })
      .expect(400, done)
  });
});

describe('Tests for create party endpoint', () => {
  it('should return 201 for success', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('authorization', adminToken)
      .send()
      .end((error, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should return 400 for invalid inputs', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('authorization', adminToken)
      .send()
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test for get all parties endpoint', () => {
  it('Should return status code 200 for success', (done) => {
    request(app)
      .get('/api/v1/parties')
      .set('authorization', adminToken)
      .end((error, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Test for get specific party endpoint', () => {
  it('Should return status code 200 for success', (done) => {
    request(app)
      .get('/api/v1/parties/1')
      .set('authorization', adminToken)
      .end((error, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 404 for party not exist', (done) => {
    request(app)
      .get('/api/v1/parties/100000')
      .set('authorization', adminToken)
      .end((error, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
describe('Test for delete specific party endpoint', () => {
  it('Should return status code 200 for success', (done) => {
    request(app)
      .delete('/api/v1/parties/1')
      .set('authorization', adminToken)
      .end((error, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return 404 for party not exist', (done) => {
    request(app)
      .delete('/api/v1/parties/1000')
      .set('authorization', adminToken)
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Party with that Id not found');
        done();
      });
  });
});

describe('Tests for create office endpoint', () => {
  it('should return 201 for success', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('authorization', adminToken)
      .send({})
      .end((error, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should return 400 for invalid inputs', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('authorization', adminToken)
      .send({ name: 'incorrectParty' })
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return 409 for already existing data', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('authorization', adminToken)
      .send({})
      .end((error, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});

describe('Test for get specific office endpoint', () => {
  it('should return 404 for office not exist', (done) => {
    request(app)
      .get('/api/v1/offices/100000')
      .set('authorization', adminToken)
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('office Id not exist');
        done();
      });
  });
}); 
