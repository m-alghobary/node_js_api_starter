/**
 * - this is all api end points to deal with the users
 */
const express = require('express');
const _ = require('lodash');
const UserService = require('../services/user');

// middlewares
const auth = require('../middlewares/auth');
const validId = require('../middlewares/validId');

// utils
const validate = require('../utils/validate');
const token = require('../utils/token');

// create express router object
const router = express.Router();

// POST: /api/users/login : try login user
router.post('/login', async (req, res) => {
	// validate the login data
	const { error } = validate.login(req.body);
	if (error) res.status(400).send(error.details[0].message);

	const result = await UserService.login(req.body.email, req.body.password);
	if (result.error) {
		return res.status(result.error.code).send(result.error.message);
	}

	const userData = _.pick(result.data, ['id', 'name', 'image', 'email', 'jobTitle', 'phone', 'gender', 'roleId', 'partnerId']);

	// send user auth token back to client
	res.send({
		...userData,
		token: token.generate({
			userId: userData.Id,
		}),
	});
});

// POST: /api/users : create new user
router.post('/', async (req, res) => {
	// validate user data in the request body
	const { error } = validate.user(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const result = await UserService.create(req.body);
	if (result.error) {
		return res.status(result.error.code).send(result.error.message);
	}

	// send user auth token back to client
	res.send({
		...result.data,
		token: token.generate({
			userId: result.data.id,
			roleId: result.data.roleId,
		}),
	});
});

// GET: /api/users : get all active users
router.get('/', async (req, res) => {
	const result = await UserService.allUsers();

	if (result.error) {
		return res.status(result.error.code).send(result.error.message);
	}

	res.send(result.data);
});

// PUT: /api/users/:user_id : update specific user
router.put('/:user_id', validId, async (req, res) => {
	// validate user data in the request body
	const { error } = validate.user(req.body, ['password', 'image']);
	if (error) return res.status(400).send(error.details[0].message);

	const result = await UserService.updateUser(req.params.user_id, req.body);
	if (result.error) {
		return res.status(result.error.code).send(result.error.message);
	}

	// send user auth token back to client
	res.send({
		...result.data,
	});
});

// DELETE: /api/users/:user_id : delete specific user
router.delete('/:user_id', validId, async (req, res) => {
	const result = await UserService.deleteUser(req.params.user_id);

	if (result.error) {
		return res.status(result.error.code).send(result.error.message);
	}

	res.send(result.data);
});

module.exports = router;
