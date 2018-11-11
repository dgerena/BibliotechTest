// const supertest = require('supertest');
// const { assert } = require('chai');

// const app = require('../../index');
// const agent = supertest.agent(app);

// describe('Passport routes', () => {
// 	const id = Number(new Date());
// 	const email = `${id}@test.com`;
// 	const password = "guest";

// 	before((done) => {
// 		agent.post('/user/create')
// 			.send({
// 				email,
// 				institution: 1,
// 				name: 'test',
// 				password,
// 				role: 'student',
// 			})
// 			.set('Content-Type', 'application/json')
// 			.set('Accept', 'application/json')
// 			.expect(200)
// 			.end(done);
// 	});

// 	it('should authenticate passport', (done) => {
// 		agent.post('/passport/local')
// 			.send({
// 				email,
// 				password,
// 			})
// 			.set('Content-Type', 'application/json')
// 			.set('Accept', 'application/json')
// 			.expect(200)
// 			.end(done);
// 	});

// 	it('should not find user', (done) => {
// 		agent.post('/passport/local')
// 			.send({
// 				email: 'failure@fail.com',
// 				password: 'nanBread',
// 			})
// 			.set('Content-Type', 'application/json')
// 			.set('Accept', 'application/json')
// 			.expect(200)
// 			.end(done);
// 	});

// 	it('should not pass authentication', (done) => {
// 		agent.post('/passport/local')
// 			.send({
// 				email,
// 				password: 'nanBread',
// 			})
// 			.set('Content-Type', 'application/json')
// 			.set('Accept', 'application/json')
// 			.expect(200)
// 			.end(done);
// 	});
// })