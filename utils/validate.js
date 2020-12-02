/**
 * - this module will containes validation functions for each model
 * @author m.alghobary
 */
const Joi = require('joi');
const { deleteProps } = require('./helpers');

module.exports = {
	// validate a user object
	user: (user, exclude = []) => {
		// create joi schema for users
		const schema = {
			name: Joi.string().trim().required(),
			phone: Joi.string().trim().required(),
			email: Joi.string().trim().email().required(),
			password: Joi.string().trim().min(7).required(),
			roleId: Joi.number().positive().required(),
			partnerId: Joi.number().positive().required(),
			image: Joi.string().trim(),
			jobTitle: Joi.string().trim(),
			gender: Joi.number().only([1, 0]).required(),
		};

		const finalSchema = deleteProps(schema, exclude);

		// validate the user object with this schema
		return Joi.validate(user, finalSchema);
	},

	// validate login data
	login: (loginData) => {
		// create login schema
		const schema = {
			email: Joi.string().trim().email().required(),
			password: Joi.string().trim().min(6).required(),
		};

		// validate the login data
		return Joi.validate(loginData, schema);
	},

	// validate change user password data
	changePass: (passData) => {
		// change password schema
		const schema = {
			oldPassword: Joi.string().trim().required(),
			newPassword: Joi.string().trim().required(),
		};

		// validate data
		return Joi.validate(passData, schema);
	},
};
