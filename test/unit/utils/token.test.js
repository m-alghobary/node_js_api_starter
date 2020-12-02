/* eslint-disable no-undef */
const jwt = require('../../../utils/token');

describe('generate token util', () => {
	it('should return a valid json web token', () => {
		// generate the token
		const token = jwt.generate({
			id: 1,
			isAdmin: true,
		});

		// make assertions
		expect(token.split('.').length).toBe(3);
	});
});

describe('verify token util', () => {
	it('should return a valid payload object', () => {
		// generate the token
		const token = jwt.generate({
			id: 1,
			isAdmin: true,
		});

		// verify the token
		const payload = jwt.verify(token);

		// make assertions
		expect(payload.id).toBe(1);
		expect(payload.isAdmin).toBe(true);
	});
});
