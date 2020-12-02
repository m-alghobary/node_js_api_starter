/**
 * - this module will be used to securely hashing and verifing
 * user passwords.
 */
const bcrypt = require('bcrypt');
const config = require('../config');
const logger = require('./logger')();

module.exports = {
	// generate hash for user password
	hash: async (password) => {
		try {
			// generate hasing salt
			const salt = await bcrypt.genSalt(config.auth.saltRounds);

			// hash the password
			return await bcrypt.hash(password, salt);
		} catch (ex) {
			// log the error
			logger.error(ex.message);
			return null;
		}
	},

	// compare password hash
	check: async (password, hashed) => {
		try {
			// return the result of the comparison
			return await bcrypt.compare(password, hashed);
		} catch (ex) {
			// log the error
			logger.error(ex.message);
			return null;
		}
	},
};
