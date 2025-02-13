module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		'jest/globals': true,
	},
	extends: [
		'airbnb',
		'airbnb-typescript',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:prettier/recommended',
		'plugin:sonarjs/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'simple-import-sort',
		'react-hooks',
		'prettier',
		'jest',
	],
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	rules: {
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.tsx', '.js', '.jsx'],
			},
		],
		'react/prop-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'react/no-array-index-key': 'error',
		'linebreak-style': [
			'error',
			process.platform === 'win32' ? 'windows' : 'unix',
		],
		'@typescript-eslint/default-param-last': 'off',

		// simple sort error
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',

		// hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',

		// airbnb
		'no-underscore-dangle': 'off',
		'no-console': 'off',
		'import/prefer-default-export': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],

		// eslint rules need to remove
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'global-require': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'import/no-cycle': 'off',

		'prettier/prettier': [
			'error',
			{},
			{
				usePrettierrc: true,
			},
		],
	},
};
