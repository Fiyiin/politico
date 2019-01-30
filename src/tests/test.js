/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../app';
import parties from '../models/party';

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
      const name = 'DFP';

      request(app)
        .patch('/api/v1/parties/1001')
        .expect(200)
        .expect((res) => {
          expect(res.body.data[0][0][0].name).toEqual(name);
        })
        .end(done);
    });
  });

  describe('DELETE request to delete party', () => {
    it('should return a status code of 204', (done) => {
      request(app)
        .delete('/api/v1/parties/1004')
        .expect(204)
        .expect({ data: [{}], status: 204 }, done);
    });
  });
});
