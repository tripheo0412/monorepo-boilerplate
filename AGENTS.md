# AGENTS.md — Monorepo handbook for Codex

## Project overview

This monorepo uses TurboRepo to manage shared libraries (packages/) and application targets with two boilerplates for backend and frontend to spin up frotnend app and backend app in apps/frontend-boilerplate and apps/backend-boilerplate.

## Stack Overview:

TypeScript 5.x

PostgreSQL 16 + pgvector

Node.js 22 LTS

PNPM 10.5.2

## Structure

```
/apps
  /frontend      # Next.js boilerplate for frontend apps
  /backend/*     # NestJS boilerplate for backend microservices
/packages
  /ui            # Shared React components
  /db            # Prisma schema and database migrations
  /*             # Miscellaneous shared libraries
/turbo.json       # TurboRepo pipeline configuration
/.github/         # GitHub Actions workflows
```

## Development Scripts

Run these commands from the root directory:

| Task          | Command                              | Required before PR |
| ------------- | ------------------------------------ | ------------------ |
| Development   | `pnpm run dev`                       | No                 |
| Testing       | `pnpm test`                          | Yes                |
| Linting       | `pnpm run lint && pnpm run prettier` | Yes                |
| Type checking | `pnpm run type-check`                | Yes                |
| Building      | `pnpm run build`                     | CI only            |
| Format code   | `pnpm run format`                    | yes                |

All commands utilize TurboRepo pipelines; always run scripts from the root.

## Code Quality

Formatter: Prettier

Linter: ESLint (strict rules)

Tests: Jest

CI: GitHub Actions enforces linting, formatting, type checking, and tests.

## Database and Redis Configuration

Local setup uses PostgreSQL 16:

```
Username: admin
Password: admin
Database: ai_document_local_db
Extension: pgvector
Port: 6379
```

Local setup uses Redis:

```
Port: 6379
No password
```

Use environment variables (.env) to store database credentials securely.

## Pull Request Checklist

- Link to the relevant issue/task
- Clearly explain the reason for changes
- Provide screenshots or API documentation if applicable

## Guidelines

Do NOT modify:
- .env\* files
- migrations/\*
- Files marked /_ DO NOT EDIT _/
- Static assets in /public unless explicitly asked

Must do:
- Write JS doc for every function, describe what the function do, type and meaning of all parameter
- For backend service always implement unit test for every function
- For backend service always use decorator to document so it can be generate in swagger - openapi specs
- If code is long or complex or hard to understand, put comment with order number for easy review
- Always check and update comment/JS doc to reflect updated code
