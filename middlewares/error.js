/**
 * - this middleware will be used by express to handle errors in routes.
 * - the express-async-errors module will wrap express route handlers in a try-catch block
 * and then pass the controle to this error middleware with the [err] object
 */

// this module will caught express aysnc uncaughtExceptions
require('express-async-errors');

const logger = require('../utils/logger')();

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	logger.error(err.message, err);
	// return internal server error response to client
	res.status(500).send(`Something was wrong!: ${err}`);
};
