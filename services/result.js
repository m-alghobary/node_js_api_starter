/**
 * encabsulate the result of a service method
 */

module.exports = class ServiceResult {
	constructor(_error = null, _data = null) {
		this.error = _error;
		this.data = _data;
	}
};
