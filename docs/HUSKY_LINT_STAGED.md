# Husky and Lint-Staged Configuration

This document describes the pre-commit hook setup using Husky and lint-staged.

## Overview

When you commit code, Husky will automatically run lint-staged, which will:

1. Run ESLint on TypeScript/JavaScript files in the affected workspace
2. Run TypeScript type checking in the affected workspace
3. Format all staged files with Prettier

## Configuration

### Husky

- Pre-commit hook: `.husky/pre-commit`
- Runs `pnpm lint-staged`

### Lint-Staged

- Configuration: `.lintstagedrc.json`
- Runs workspace-specific commands based on file paths

## File Type Handling

### Backend Boilerplate (`apps/backend-boilerplate/**/*.{ts,js}`)

1. `pnpm --filter ./apps/backend-boilerplate lint` - ESLint check
2. `pnpm --filter ./apps/backend-boilerplate type-check` - TypeScript check
3. `prettier --write` - Format files

### Frontend Boilerplate (`apps/frontend-boilerplate/**/*.{ts,tsx,js,jsx}`)

1. `pnpm --filter ./apps/frontend-boilerplate lint` - Next.js ESLint check
2. `pnpm --filter ./apps/frontend-boilerplate type-check` - TypeScript check
3. `prettier --write` - Format files

### Types Package (`packages/types/**/*.{ts,js}`)

1. `pnpm --filter ./packages/types type-check` - TypeScript check
2. `prettier --write` - Format files

### Other Files (`*.{json,md,mdx,css,scss,yaml,yml}`)

- `prettier --write` - Format files only

## Testing the Setup

To test the pre-commit hook:

```bash
git add .
git commit -m "test: husky and lint-staged setup"
```

The commit will only succeed if all checks pass.

## Bypassing Hooks (Emergency Only)

If you need to bypass the hooks in an emergency:

```bash
git commit --no-verify -m "your message"
```

**Note**: This should only be used in exceptional circumstances.
