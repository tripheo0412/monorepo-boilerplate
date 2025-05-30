module.exports = {
	// Backend files
	'apps/backend-boilerplate/**/*.{ts,js}': [
		// Run lint and type-check on the entire backend app
		() => 'pnpm --filter ./apps/backend-boilerplate lint',
		() => 'pnpm --filter ./apps/backend-boilerplate type-check',
		// Format only the staged files
		'prettier --write',
	],

	// Frontend files
	'apps/frontend-boilerplate/**/*.{ts,tsx,js,jsx}': [
		// Run lint and type-check on the entire frontend app
		() => 'pnpm --filter ./apps/frontend-boilerplate lint',
		() => 'pnpm --filter ./apps/frontend-boilerplate type-check',
		// Format only the staged files
		'prettier --write',
	],

	// Types package files
	'packages/types/**/*.{ts,js}': [
		// Run type-check on the entire types package
		() => 'pnpm --filter ./packages/types type-check',
		// Format only the staged files
		'prettier --write',
	],

	// Other files (markdown, json, css, etc.)
	'*.{json,md,mdx,css,scss,yaml,yml}': ['prettier --write'],

	// Root level TypeScript/JavaScript files
	'*.{ts,js,mjs}': ['prettier --write'],
}
