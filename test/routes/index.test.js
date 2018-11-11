const supertest = require('supertest');

const app = require('../../index');
const agent = supertest.agent(app);

describe('Index route', () => {
    it('should expect 200', (done) => {
        agent.get('/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });
})