/**
 * - this module will be used to scurely generate and verify
 * json web tokens to provide authrized data access.
 */

const fs = require('fs');
const jwt = require('jsonwebtoken');
const logger = require('./logger')();

const privateKey = fs.readFileSync('./keys/private.key', 'utf8').trim();
const publicKey = fs.readFileSync('./keys/public.key', 'utf8').trim();


const generate = (payload) => jwt.sign(payload, privateKey, {
	algorithm: 'RS256',
	expiresIn: '2 days',
});


const verify = (token) => {
	try {
		return jwt.verify(token, publicKey, {
			algorithms: ['RS256'],
			expiresIn: '2 days',
		});
	} catch (ex) {
		logger.error(ex.message);
		throw ex;
	}
};

module.exports = {
	generate,
	verify,
};
