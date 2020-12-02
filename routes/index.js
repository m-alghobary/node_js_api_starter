const express = require('express');
const cors = require('cors');

// middlewares
const error = require('../middlewares/error');

// routes
const setup = require('./setup');
const users = require('./users');
const roles = require('./roles');
const medicals = require('./medicals');
const diseases = require('./diseases');
const needs = require('./needs');
const criterions = require('./criterions');
const companies = require('./companies');
const agents = require('./agents');
const beneficials = require('./beneficals');
const projects = require('./projects');
const store = require('./store');
const partners = require('./partners');
const register = require('./register');

// setuo express routes and middlewares
module.exports = (app) => {
	// to pasre request body as json object
	app.use(express.json());

	// enable api remote access
	app.use(
		cors({
			origin: ['http://localhost:8080', 'http://localhost:8081'],
			// eslint-disable-next-line comma-dangle
		})
	);

	// api routes
	app.use('/api/setup', setup);
	app.use('/api/users', users);
	app.use('/api/roles', roles);
	app.use('/api/medicals', medicals);
	app.use('/api/diseases', diseases);
	app.use('/api/needs', needs);
	app.use('/api/criterions', criterions);
	app.use('/api/companies', companies);
	app.use('/api/agents', agents);
	app.use('/api/register', register);
	app.use('/api/projects', projects);
	app.use('/api/store', store);
	app.use('/api/partners', partners);
	app.use('/api/beneficials', beneficials);

	// error middleware
	app.use(error);
};
