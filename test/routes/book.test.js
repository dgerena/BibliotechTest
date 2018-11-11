const supertest = require('supertest');
const sinon = require('sinon');
const { assert } = require('chai');

const BookModel = require('../../models/book.model');

const app = require('../../index');
const agent = supertest.agent(app);

describe('Book routes', () => {
    const isbn = Number(new Date());
    it('should expect book get to return', (done) => {
        agent.get('/book/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, response) => {
                const {
                    status,
                    data: {
                        isbn,
                        title,
                        author,
                        institution,
                    }
                } = response.body;

                assert(status === 'success');
                assert(isbn === '1');
                assert(title === 'testbook');
                assert(author === 'tester');
                assert(institution === 1);

                done(err);
            });
    });

    it('should expect book create pass', (done) => {
        agent.post('/book/create')
            .send({
                isbn,
                title: 'testbook',
                author: 'tester',
                institution: 1,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, response) => {
                const { status } = response.body;

                assert(status === 'success');
                done(err);
            });
    });

    it('should expect book to fail without isbn', (done) => {
        agent.post('/book/create')
            .send({
                title: 'testbook',
                author: 'tester',
                institution: 1,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, response) => {
                const { status } = response.body;

                assert(status === 'fail');
                done(err);
            });
    });

    it('should expect book to exist', (done) => {
        agent.post('/book/create')
            .send({
                isbn,
                title: 'testbook',
                author: 'tester',
                institution: 1,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, response) => {
                const { status, data: { error } } = response.body;

                assert(status === 'fail');
                done(err);
            });
    });
});

describe('Book routes negative test', () => {
    it('Should throw on findOne', (done) => {
        const error = new Error('Test Error');
        const mock = sinon.stub(BookModel, 'findOne')
            .callsFake(() => Promise.reject(error));

        agent.post('/book/create')
            .send({
                isbn: Number(new Date()),
                title: 'testbook',
                author: 'tester',
                institution: 1,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, response) => {
                const { status, message } = response.body;
                mock.restore();
                assert(status === 'error');
                assert(message === error.message);
                done(err);
            });
    });

    it('Should throw on create', (done) => {
        const error = new Error('Test Error');
        const mock = sinon.stub(BookModel, 'create')
            .callsFake(() => Promise.reject(error));

        agent.post('/book/create')
            .send({
                isbn: Number(new Date()),
                title: 'testbook',
                author: 'tester',
                institution: 1,
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, response) => {
                const { status, message } = response.body;
                mock.restore();
                assert(status === 'error');
                assert(message === error.message);
                done(err);
            });
    });

});