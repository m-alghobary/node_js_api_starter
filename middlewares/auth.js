/**
 * - this middleware will be used before any route handler,
 * that require authentications.
 */

const { auth } = require('../config');
const jwt = require('../utils/token');

module.exports = (req, res, next) => {
	// verify the existance of the token in the request headers
	const token = req.header(auth.header);
	if (!token) return res.status(401).send('Access denied. No token provided.');

	// try to encode the token
	try {
		const payload = jwt.verify(token);
		req.payload = payload; // append payload to the req object

		// pass controle to the next middleware
		next();
	} catch (exp) {
		res.status(400).send(`Invalid token: ${exp.message}`);
	}
};
