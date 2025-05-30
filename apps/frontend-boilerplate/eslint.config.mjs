// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	{
		ignores: [
			'**/coverage',
			'**/dist',
			'**/build',
			'**/node_modules',
			'**/.next',
		],
	},
	...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
	...storybook.configs['flat/recommended'],
]

export default eslintConfig
