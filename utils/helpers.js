const fs = require('fs');
const { promisify } = require('util');
const { camelCase } = require('lodash');
// make promise-based versions of fs function
const readFileAysnc = promisify(fs.readFile);

module.exports = {
	readFile: async (path) => {
		// read the file content
		const content = await readFileAysnc(path, {
			encoding: 'utf8',
		});

		// return content
		return content;
	},

	validId: (id) => {
		const idInt = parseInt(id, 10);
		if (isNaN(idInt)) {
			return false;
		}
		if (idInt <= 0 || id.length > 9) {
			return false;
		}
		return idInt;
	},

	deleteProps: (object, props) => {
		const finalObject = object;

		for (let i = 0; i < props.length; i++) {
			if (finalObject.hasOwnProperty(props[i])) {
				delete finalObject[props[i]];
			}
		}

		return finalObject;
	},
	splitObj: (obj) => {
		const items = [];
		Object.keys(obj).forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				items.push({
					key,
					value: obj[key],
				});
			}
		});

		return items;
	},
	joinToObj: (arr, prefix = null) => {
		const obj = {};
		arr.forEach((item) => {
			const key = prefix ? camelCase(item.key.replace(prefix, '')) : item.key;
			obj[key] = item.value;
		});

		return obj;
	},
	mapDataTableOptions: (options) => ({
		orderBy: options.sortBy,
		orderType: options.sortDesc ? 'DESC' : 'ASC',
		start: (options.page - 1) * options.itemsPerPage,
		length: options.itemsPerPage,
		query: options.query,
	}),
};
