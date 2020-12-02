/**
 * Deal with users table queries
 */
const db = require('../data');
const loadQuery = require('../utils/loadQuery');

const insert = async (user) => {
	const query = await loadQuery('users.create');
	const request = await db.getRequest();

	return request
		.input('name', db.sql.NVarChar, user.name)
		.input('image', db.sql.NVarChar, user.image)
		.input('email', db.sql.NVarChar, user.email)
		.input('pass', db.sql.NVarChar, user.password)
		.input('job', db.sql.NVarChar, user.jobTitle)
		.input('phone', db.sql.NVarChar, user.phone)
		.input('gender', db.sql.TinyInt, user.gender)
		.input('roleId', db.sql.Int, user.roleId)
		.input('partnerId', db.sql.Int, user.partnerId)
		.query(query);
};

const emailExist = async (email) => {
	const query = await loadQuery('users.emailExist');
	const request = await db.getRequest();
	return request.input('email', db.sql.NVarChar, email).query(query);
};

const getByEmail = async (email) => {
	const query = await loadQuery('users.getByEmail');
	const request = await db.getRequest();
	return request.input('email', db.sql.NVarChar, email).query(query);
};

const getById = async (userId) => {
	const query = await loadQuery('users.getById');
	const request = await db.getRequest();
	return request.input('userId', db.sql.Int, userId).query(query);
};

const getAll = async () => {
	const query = await loadQuery('users.getAll');
	const request = await db.getRequest();
	return request.query(query);
};

const updateDeleted = async (userId) => {
	const query = await loadQuery('users.delete');
	const request = await db.getRequest();
	return request.input('userId', userId).query(query);
};

const update = async (userId, user) => {
	const query = await loadQuery('users.update');
	const request = await db.getRequest();

	return request
		.input('name', db.sql.NVarChar, user.name)
		.input('email', db.sql.NVarChar, user.email)
		.input('job', db.sql.NVarChar, user.jobTitle)
		.input('phone', db.sql.NVarChar, user.phone)
		.input('gender', db.sql.TinyInt, user.gender)
		.input('roleId', db.sql.Int, user.roleId)
		.input('partnerId', db.sql.Int, user.partnerId)
		.input('userId', db.sql.Int, userId)
		.query(query);
};

module.exports = {
	insert,
	emailExist,
	getByEmail,
	getById,
	getAll,
	updateDeleted,
	update,
};
