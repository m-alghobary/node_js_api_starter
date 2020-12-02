/* eslint-disable no-undef */
const helpers = require('../../../utils/helpers');

describe('delete props util function', () => {
	it('should delete all props passed to it from the object', () => {
		// prepare test object
		const user = {
			name: 'ali',
			age: 78,
			email: 'ali@gmail.com',
			phone: '+017786980775',
		};

		// try delete props
		const result = helpers.deleteProps(user, ['name', 'phone', 'abs']);

		// make assertions
		expect(result).toEqual({
			age: 78,
			email: 'ali@gmail.com',
		});
	});
});
