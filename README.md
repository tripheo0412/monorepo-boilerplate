# Turborepo Monorepo Example

This repository contains a Turborepo setup using pnpm workspaces with two boilerplate for backend and frontend:

- **frontend-boilerplate** – a Next.js app
- **backend-boilerplate** – a NestJS app

A shared `types` package provides TypeScript types used by both apps.

## Scripts

- `pnpm dev` – run both apps in development
- `pnpm build-type` – build types lib
- `pnpm build` – build all apps
- `pnpm lint` – run ESLint
- `pnpm format` – format code with Prettier
- `pnpm prettier` – check code format with Prettier

## Requirements

- Node.js
- pnpm

Install dependencies with `pnpm install` and then run the scripts above.

The frontend is configured with Tailwind CSS and the shadcn component library.

## Pre-commit Hooks

This project uses Husky and lint-staged to ensure code quality. On every commit:

- ESLint checks are run on affected files
- TypeScript type checking is performed
- Prettier formats all staged files

See [docs/HUSKY_LINT_STAGED.md](docs/HUSKY_LINT_STAGED.md) for details.
