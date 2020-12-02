/**
 * - this module will be used to load sql query,
 * by query folder.fileName without .sql ext
 */

const { join } = require('path');
const logger = require('./logger')();
const helpers = require('./helpers');

module.exports = async (queryFile) => {
	// get the queries folder path
	const queriesPath = join(process.cwd(), 'data', 'queries');

	// split the query folder and file
	const pathParts = queryFile.split('.');
	let queryPath = pathParts.reduce((parentPath, path, i) => {
		if (i !== pathParts.length - 1) {
			return join(parentPath, path);
		}

		return parentPath;
	}, queriesPath);

	try {
		// the path to sql query file
		queryPath = join(queryPath, `${pathParts[pathParts.length - 1]}.sql`);

		// read the query data
		const query = await helpers.readFile(queryPath);
		return query;
	} catch (ex) {
		// log the error
		logger.error(`Invalid query file path!: (${ex.message})`);
		return null;
	}
};
