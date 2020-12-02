module.exports = {
	port: process.env.PORT,
	log: {
		errorFile: process.env.LOG_ERROR_FILE,
		exceptionFile: process.env.LOG_EXCEPTION_FILE,
	},
	db: {
		host: process.env.DB_HOST,
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
	},
	auth: {
		jwtSecret: process.env.JWT_PRIVATE_KEY,
		header: process.env.JWT_HEADER,
		saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
	},
};
