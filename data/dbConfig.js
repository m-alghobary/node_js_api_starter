/**
 * prepare the data in the way required by mssql package.
 */
const { db } = require('../config');

module.exports = {
	user: db.user,
	password: db.pass,
	server: db.host,
	database: db.name,
	options: {
		enableArithAbort: true,
	},
};
