const { assert } = require('chai');
const mongoose = require('mongoose');
const datastore = require('../../datastores/mongo.datastore');

describe('Mongo datastore', () => {
    it('should call mongoose.connect', async () => {
        const connection = await datastore;
        assert(connection instanceof mongoose.Mongoose, "Return with an instance of Mongoose connection");
    });
});