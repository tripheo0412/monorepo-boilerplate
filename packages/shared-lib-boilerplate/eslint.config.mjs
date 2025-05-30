import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default [
	{
		ignores: [
			'**/dist',
			'**/build',
			'**/node_modules',
			'**/storybook-static',
			'**/.docusaurus',
			'**/ncc',
			'**/coverage',
		],
	},
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			prettier: prettierPlugin,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
		},

		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'@typescript-eslint/no-unused-expressions': [
				'error',
				{allowTernary: true, allowShortCircuit: true},
			],
		},
		settings: {
			prettier: prettierConfig, // Apply Prettier config if needed
		},
	},
]
