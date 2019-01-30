/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../app';
import parties from '../models/party';
import offices from '../models/office';

describe('Party Server', () => {
  describe('GET all parties', () => {
    it('responds with json', (done) => {
      request(app)
        .get('/api/v1/parties')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET all parties', () => {
    it('should return a status code of 200 and all party objects', (done) => {
      request(app)
        .get('/api/v1/parties')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ data: [parties], status: 200 });
        })
        .end(done);
    });
  });

  describe('GET specific party by Id', () => {
    it('should return a single party object', (done) => {
      request(app)
        .get('/api/v1/parties/1001')
        .expect(200)
        .expect((res) => {
          expect(res.body.data[0]).toEqual([parties[0]]);
        })
        .end(done);
    });
    it('should return status code 404 when Id does not match', (done) => {
      request(app)
        .get('/api/v1/parties/419')
        .expect(404)
        .expect({ error: "Can't find any Party with that Id", status: 404 }, done);
    });
  });

  describe('POST create a new party', () => {
    it('should return a status code of 201 and add party', (done) => {
      const newParty = {
        id: 1008,
        name: 'DPP',
        hqAddress: '24, Palm Avenue, Maryland, Lagos',
        logoUrl: 'https://www.google.com/search?q=apc&rlz=1C1CHBF_enNG806NG806&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjGpPqc7o3gAhXvURUIHZ7QCpcQ_AUIDigB&biw=1366&bih=646#imgrc=dFrKjD_a2NdY2M:',
      };

      request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .set('Accept', 'application/json')
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toContainEqual({ data: newParty });
        })
        .end(done);
    });

    it('should return a status code of 409 if Id already exists', (done) => {
      const newParty = {
        id: 1008,
        name: 'DPP',
        hqAddress: 'Ikeja',
        logoUrl: 'www.google.com',
      };

      request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .set('Accept', 'application/json')
        .expect({ error: 'Party with that Id already exists', status: 409 }, done);
    });
  });

  describe('PATCH request to update party', () => {
    it('should return a status code of 200 and update party', (done) => {
      const updateParty = {
        id: 1001,
        name: 'APC',
      };

      request(app)
        .patch('/api/v1/parties/1001/name')
        .send(updateParty)
        .expect(200)
        .expect((res) => {
          expect(res.body.data[0][0].name).toEqual(updateParty.name);
        })
        .end(done);
    });
  });

  describe('DELETE request to delete party', () => {
    it('should return a status code of 410 ', (done) => {
      request(app)
        .delete('/api/v1/parties/1004')
        .expect(410)
        .expect({ data: 'Successfully deleted party', status: 410 }, done);
    });
  });
});


describe('Office Server', () => {
  describe('GET all offices', () => {
    it('responds with json', (done) => {
      request(app)
        .get('/api/v1/parties')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });


  describe('GET all offices', () => {
    it('should return a status code of 200 and all office objects', (done) => {
      request(app)
        .get('/api/v1/offices')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ data: [offices], status: 200 });
        })
        .end(done);
    });
  });

  describe('GET specific office by Id', () => {
    it('should return a single office object', (done) => {
      request(app)
        .get('/api/v1/offices/9001')
        .expect(200)
        .expect((res) => {
          expect(res.body.data[0]).toEqual([offices[0]]);
        })
        .end(done);
    });
    it('should return status code 404 when Id does not match', (done) => {
      request(app)
        .get('/api/v1/offices/419')
        .expect(404)
        .expect({ error: "Can't find any Office with that Id", status: 404 }, done);
    });
  });

  describe('POST create a new office', () => {
    it('should return a status code of 201 and add office', (done) => {
      const newOffice = {
        id: 9005,
        type: 'fedral',
        name: 'president',
      };

      request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .set('Accept', 'application/json')
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toContainEqual({ data: newOffice });
        })
        .end(done);
    });
  });
});
