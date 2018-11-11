const supertest = require('supertest');
const sinon = require('sinon');
const { assert } = require('chai');

const User = require('../../models/user.model');
const app = require('../../index');
const agent = supertest.agent(app);

describe('User routes', () => {
    const id = Number(new Date());
    const email = `${id}@test.com`;
    const password = "guest";

    it('should expect this user to already exist', (done) => {
        agent.post('/user/create')
            .send({
                email: 'test@test.com',
                institution: 1,
                name: 'test',
                password: "guest",
                role: 'student',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect({ status: 'fail', data: 'User already exists' })
            .end(done);
    });

    it('should expect the create to fail', (done) => {
        agent.post('/user/create')
            .send({
                email: 'test@test.com',
                institution: 1,
                password: "guest",
                role: 'student',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect({ status: 'fail', data: 'fields required { name, email, password, role, institution }' })
            .end(done);
    });


    it('should create user', (done) => {
        agent.post('/user/create')
            .send({
                email,
                institution: 1,
                name: 'test',
                password,
                role: 'student',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, response) => {
                const { status, data: user } = response.body;
                assert(status === 'success');
                assert(user.name === 'test');
                assert(user.email === email);
                assert(user.role === 'student');
                assert(user.institution === 1);
                done(err);
            });
    });

    it('should fail to create user', (done) => {
        agent.post('/user/create')
            .send({
                email,
                institution: 1,
                name: 'test',
                role: 'student',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, response) => {
                const { status, data: user } = response.body;
                assert(status === 'fail');
                done(err);
            });
    });

    it('should authenticate passport', (done) => {
        agent.post('/user/signIn')
            .send({
                email,
                password,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });

    it('should not find user', (done) => {
        agent.post('/user/signIn')
            .send({
                email: 'failure@fail.com',
                password: 'nanBread',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });

    it('should not pass authentication', (done) => {
        agent.post('/user/signIn')
            .send({
                email,
                password: 'nanBread',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });
});

describe('User routes negative testing', () => {

    it('should throw findOne error', (done) => {
        const id = Number(new Date());
        const email = `${id}@test.com`;
        const password = "guest";

        const error = new Error("Test Error");
        const mock = sinon.stub(User, 'findOne').callsFake(() =>
            Promise.resolve().then(() => {
                throw error;
            })
        );

        agent.post('/user/create')
            .send({
                email,
                institution: 1,
                name: 'test',
                password,
                role: 'student',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, response) => {
                const { status, message } = response.body;

                assert(status === 'error');
                assert(message === error.message);

                mock.restore();
                done(err);
            });
    });

    it('should throw create error', (done) => {
        const id = Number(new Date());
        const email = `${id}@test.com`;
        const password = "guest";

        const error = new Error("Test Error");
        const mock = sinon.stub(User, 'create').callsFake(() =>
            Promise.resolve().then(() => {
                throw error;
            })
        );

        agent.post('/user/create')
            .send({
                email,
                institution: 1,
                name: 'test',
                password,
                role: 'student',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, response) => {
                const { status, message } = response.body;

                assert(status === 'error');
                assert(message === error.message);

                mock.restore();
                done(err);
            });
    });
});