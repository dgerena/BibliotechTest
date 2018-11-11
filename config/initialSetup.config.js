/* istanbul ignore file */
const User = require('../models/user.model');

const initialSetup = async () => {
	const userFound = await User.findOne({ email: 'test@test.com' });
	if (userFound) { return userFound; }

	const user = await User.create({
		name: 'eli gerena',
		email: 'test@test.com',
		role: 'administrator',
		institution: 1
	});

	await user.setPassword('password');
	await user.save();

	return user;
};

module.exports = initialSetup;