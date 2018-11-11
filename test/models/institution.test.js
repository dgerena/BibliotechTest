const sinon = require('sinon');
const mongoose = require('mongoose');
const { assert } = require('chai');
const Institution = require('../../models/institution.model');

describe('Institution model', () => {
    it('should create Schema', () => {
        assert(Institution.schema instanceof mongoose.Schema);
    });

    it('should create model', () => {
        assert(Institution.base === mongoose && Institution.model, "Is a mongoose model");
    });
});