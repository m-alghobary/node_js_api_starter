/* eslint-disable no-undef */
const hashing = require('../../../utils/hashing');

// test the hash function
describe('hasing password util', () => {
	it('should return a valid hash if it was valid string password', async () => {
		// get hash string
		const hash = await hashing.hash('123456');

		// assert the hash length
		expect(hash.length).toBe(60);
	});

	it('should return null if password not valid', async () => {
		// get hash result
		const hash = await hashing.hash(null);

		// assert the hash is null
		expect(hash).toBe(null);
	});
});

// test the check function
describe('the check hash function', () => {
	it('should return true if it the same password', async () => {
		// make hash string
		const hash = await hashing.hash('123456');

		// get check result
		const check = await hashing.check('123456', hash);

		// assert check result
		expect(check).toBe(true);
	});

	it('should return false if it the password not the same', async () => {
		// make hash string
		const hash = await hashing.hash('123456');

		// get check result
		const check = await hashing.check('12345', hash);

		// assert check result
		expect(check).toBe(false);
	});

	it('should return null if password not valid', async () => {
		// make hash string
		const hash = await hashing.hash('123456');

		// get check result
		const check = await hashing.check(null, hash);

		// assert the hash is null
		expect(check).toBe(null);
	});
});
