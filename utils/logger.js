/**
 * - this module will be used to log errors, exceptions, infos
 * messages through the system
 */

const { join } = require('path');
const winston = require('winston');
const { log } = require('../config');

// hold the logger instance
let logger = null;

// check the project environment
function isProduction() {
	return process.env.NODE_ENV === 'production';
}

// initalize the looger
module.exports = () => {
	// return the existing logger instance
	if (logger) return logger;

	// eslint-disable-next-line object-curly-newline
	const { timestamp } = winston.format;

	// create winston logger instance
	logger = winston.createLogger({
		format: winston.format.combine(
			timestamp(),
			winston.format.prettyPrint(),
		),
		transports: [
			new winston.transports.File({
				filename: join(process.cwd(), 'log', log.errorFile),
				level: 'warn',
			}),
		],
		exceptionHandlers: [
			new winston.transports.File({
				filename: join(process.cwd(), 'log', log.exceptionFile),
			}),
		],

		// exit node process on error just in the dev environment
		exitOnError: !isProduction,
	});

	// pass unhandledRejection errors to winston
	process.on('unhandledRejection', (exp) => {
		throw exp;
	});

	// print errors on console in the deveolpment env
	if (!isProduction()) {
		logger.clear();
		logger.add(
			new winston.transports.Console({
				handleExceptions: true,
			}),
		);
	}

	return logger;
};
