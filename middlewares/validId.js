/**
 * this middleware validate the resource id params
 * in the routes ex: /resourec/:user_id
 */

const { validId } = require('../utils/helpers');

module.exports = (req, res, next) => {
	// extract id parameters
	const idParams = Object.keys(req.params).filter((param) => param.endsWith('_id'));

	idParams.forEach((param) => {
		// validate
		const validParam = validId(req.params[param]);
		if (!validParam) return res.status(400).send(`Invalid parametre! [${param}]`);

		// replace the old id param with the parsed one
		req.params[param] = validParam;
	});

	// go to the next route handler
	next();
};
