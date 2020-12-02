/**
 * - this module will be used to manage database connections.
 * - we must ensure that only one connection bool is exist and alive.
 */
const sql = require('mssql');
const dbConfig = require('./dbConfig');
const logger = require('../utils/logger')();

// the connection pool
let pool = null;

const close = async () => {
	try {
		await pool.close();

		// set the connection pool to null,
		// then new one will be created by getConnection()
		pool = null;
	} catch (ex) {
		// if any errors, set the connection pool to null,
		// then new one will be created by getConnection()
		pool = null;
		logger.error(ex.message);
	}
};

const getConnection = async () => {
	// if connection pool is already exists, rturn it
	if (pool) return pool;

	try {
		pool = await new sql.ConnectionPool(dbConfig).connect();

		pool.on('error', async (err) => {
			await close();
			logger.error(err.message);
		});

		return pool;
	} catch (ex) {
		logger.error(ex.message);

		pool = null;
	}
};

const getRequest = async () => {
	const cpool = await getConnection();
	return cpool.request();
};

module.exports = {
	sql,
	getRequest,
};
