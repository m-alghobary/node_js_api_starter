/**
 * - unit test all possible scenario of loadQuery function.
 */

/* eslint-disable no-undef */
const loadQuery = require('../../../utils/loadQuery');
const helpers = require('../../../utils/helpers');

describe('load query utils', () => {
	it('should return null if the path not valid', async () => {
		// mock the read file healper function
		helpers.readFile = jest.fn().mockRejectedValue(new Error('no such file'));

		// get result
		const result = await loadQuery('rand.notValid');

		// make assertions
		expect(result).toBe(null);
	});

	it('should return query string if the path is valid', async () => {
		// mock the read file healper function
		helpers.readFile = (path) => path;

		// get result
		const result1 = await loadQuery('rand.test');
		const result2 = await loadQuery('rand.test.another');
		const result3 = await loadQuery('rand.test.more.another');

		// make assertions
		expect(result1).toBe('test sql');
		expect(result2).toBe('test sql');
		expect(result3).toBe('test sql');
	});
});
