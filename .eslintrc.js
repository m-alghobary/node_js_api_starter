module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: ['airbnb-base'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		'no-console': 'off',
		'linebreak-style': 'off',
		'no-unused-vars': 'warn',
		'func-names': 'off',
		indent: ['warn', 'tab'],
		'consistent-return': 'off',
		'no-restricted-globals': 'off',
		'no-plusplus': 'off',
		'no-prototype-builtins': 'off',
		'no-return-assign': 'off',
		'no-tabs': 'off',
		'max-len': [
			'error',
			{
				code: 150,
			},
		],
	},
};
