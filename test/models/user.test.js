const mongoose = require('mongoose');
const { assert } = require('chai');
const User = require('../../models/user.model');

describe('User model', () => {
    it('should create Schema', () => {
        assert(User.schema instanceof mongoose.Schema);
    });

    it('should create model', () => {
        assert(User.base === mongoose && User.model, "Is a mongoose model");
    });

    it('should set users password and salt', async () => {
        const schema = User.schema;
        await schema.methods.setPassword('password');

        assert(schema.methods.salt, 'To create salt');
        assert(schema.methods.password, 'To set password');
    });

    it('should set and check users password and salt', async () => {
        const schema = User.schema;

        await schema.methods.setPassword('password');

        assert(schema.methods.salt, 'To create salt');
        assert(schema.methods.password, 'To set password');
        const passed = await schema.methods.verifyPassword('password');

        assert(passed, 'To verify password');
    });

    it('should Fails to set and check users password and salt', async () => {
        const schema = User.schema;
        await schema.methods.setPassword('wrong');
        assert(schema.methods.salt, 'To create salt');
        assert(schema.methods.password, 'To set password');

        const passed = await schema.methods.verifyPassword('stillWrong');
        assert(!passed, 'To verify password');
    });
});