/**
 * the system users business logic
 */
const _ = require('lodash');
const User = require('../models/users');
const Result = require('./result');
const hashing = require('../utils/hashing');

const create = async (userData) => {
	try {
		const { recordset } = await User.emailExist(userData.email);
		if (recordset[0].Emails) {
			return new Result({
				code: 400,
				msg: 'Email already in use!',
			});
		}

		const hashedPass = await hashing.hash(userData.password);
		const user = _.pick(userData, ['name', 'email', 'phone', 'jobTitle', 'image', 'gender', 'roleId', 'partnerId']);
		const result = await User.insert({ ...user, password: hashedPass });

		const savedUser = await User.getById(result.recordset[0].id);
		return new Result(null, savedUser.recordset[0]);
	} catch (error) {
		return new Result({
			code: 500,
			msg: 'Internal server error!',
		});
	}
};

const login = async (userEmail, userPassword) => {
	try {
		// try to get user
		const result = await User.getByEmail(userEmail);
		if (result.recordset.length === 0) {
			return new Result({
				code: 404,
				message: 'Incorrect email or passowrd',
			});
		}

		// verify user passowrd
		const valid = await hashing.check(userPassword, result.recordset[0].password);
		if (!valid) {
			return new Result({
				code: 404,
				message: 'Incorrect email or passowrd',
			});
		}

		return new Result(null, result.recordset[0]);
	} catch (error) {
		return new Result({
			code: 500,
			msg: 'Internal server error!',
		});
	}
};

const allUsers = async () => {
	try {
		const result = await User.getAll();

		return new Result(null, result.recordset);
	} catch (error) {
		return new Result({
			code: 500,
			msg: 'Internal server error!',
		});
	}
};

const deleteUser = async (userId) => {
	try {
		const result = await User.updateDeleted(userId);
		if (!result.rowsAffected) {
			return new Result({
				code: 404,
				msg: 'No user with the given id!',
			});
		}

		return new Result(null, { userId });
	} catch (error) {
		return new Result({
			code: 500,
			msg: 'Internal server error!',
		});
	}
};

const updateUser = async (userId, userData) => {
	try {
		const result = await User.update(userId, userData);
		if (!result.rowsAffected[0]) {
			return new Result({
				code: 404,
				msg: 'User not found!',
			});
		}

		// get the user updated data
		const user = await User.getById(userId);

		return new Result(null, user.recordset[0]);
	} catch (error) {
		return new Result({
			code: 500,
			msg: 'Internal server error!',
		});
	}
};

module.exports = {
	create,
	login,
	allUsers,
	deleteUser,
	updateUser,
};
