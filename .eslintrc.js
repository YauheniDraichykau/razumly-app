/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	env: {
	  browser: true,
	  node: true,
	  es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
	  ecmaVersion: 'latest',
	  sourceType: 'module',
	},
	extends: [
	  'eslint:recommended',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:react/recommended',
	  'plugin:react-hooks/recommended',
	  'plugin:jsx-a11y/recommended',
	  'plugin:prettier/recommended',
	  'next/core-web-vitals',
	],
	plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
	rules: {
	  'prettier/prettier': ['error', { singleQuote: true }],
	  'no-console': 'warn',
	  'no-unused-vars': 'off',
	  '@typescript-eslint/no-unused-vars': ['warn'],
  
	  'react/react-in-jsx-scope': 'off',
	  'react/prop-types': 'off',

	  '@typescript-eslint/explicit-function-return-type': 'off',
	  '@typescript-eslint/no-explicit-any': 'warn',
	},
	settings: {
	  react: {
		version: 'detect',
	  },
	},
  };
  