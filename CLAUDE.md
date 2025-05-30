# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript monorepo using TurboRepo and pnpm workspaces, containing:

- **frontend-boilerplate**: Next.js 15 app with App Router, Tailwind CSS, and shadcn/ui
- **backend-boilerplate**: NestJS 11 API with MikroORM, PostgreSQL, and Redis
- **packages/types**: Shared TypeScript types between frontend and backend

## Essential Commands

### Development

```bash
pnpm dev          # Run all apps in development mode
pnpm build        # Build all apps
pnpm test         # Run all tests
pnpm lint         # Run ESLint across all apps
pnpm format       # Format code with Prettier
pnpm type-check   # TypeScript type checking
```

### Backend-specific (in apps/backend-boilerplate/)

```bash
pnpm dev          # Start NestJS with hot reload (port 3001)
pnpm test         # Run unit tests
pnpm test:e2e     # Run e2e tests
pnpm test:watch   # Run tests in watch mode
```

### Frontend-specific (in apps/frontend-boilerplate/)

```bash
pnpm dev          # Start Next.js with Turbopack (port 3000)
pnpm test         # Run Jest tests
pnpm test:watch   # Run tests in watch mode
```

## Architecture & Key Patterns

### Backend Architecture

- **Framework**: NestJS with modular structure
- **Database**: PostgreSQL with MikroORM, migrations in `src/migrations/`
- **Auth**: JWT authentication with @nestjs/jwt and bcrypt password hashing
- **Environment**: Validated with Joi schema in `src/configs/env-schema.ts`
- **Base Entity**: All entities extend `BaseEntity` with soft delete support
- **API Documentation**: Swagger available when running
- **Health Checks**: Terminus module at `/health` endpoint (skips rate limiting)
- **Caching**: Redis-based caching service using @keyv/redis
- **Rate Limiting**: Default 10 requests per 60 seconds, configurable via env vars

### Frontend Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components in `src/components/ui/`
- **Component Development**: Storybook for isolated UI development
- **API Client**: Axios with automatic JWT token management and error handling
- **Authentication**: JWT tokens stored in cookies, automatic refresh on 401
- **Toast Notifications**: Sonner for user feedback on errors and success
- **Route Protection**: Next.js middleware for auth-protected routes
- **Path Alias**: `@/` maps to `src/`
- **Testing**: Jest with React Testing Library

### Shared Patterns

- **Types**: Shared via `@repo/types` package
- **TypeScript**: Strict mode enabled, version 5.8.3
- **Node**: v22 LTS required

## Critical Development Rules

1. **Entity and DTO Patterns**:

   - ALL entities MUST have "Entity" suffix (e.g., `UserEntity`, `ProductEntity`)
   - Every entity, request object, and response object MUST have corresponding DTOs
   - DTOs MUST be TypeScript interfaces in `packages/types` for sharing with frontend
   - Backend DTOs implement shared interfaces and add validation decorators
   - Frontend uses shared DTOs for type safety with Zod validation
   - **IMPORTANT**: After adding new types to `packages/types`, ALWAYS run `pnpm build-type` in the types directory to build the library for other apps

2. **Documentation**:

   - Write JSDoc for EVERY function explaining:
     - What the function does
     - @param with type and description for each parameter
     - @returns with type and description of return value
     - @throws if the function can throw errors
   - Example:
     ```typescript
     /**
      * Validates user credentials and returns authentication token
      * @param email User's email address
      * @param password User's password in plain text
      * @returns JWT token for authenticated requests
      * @throws UnauthorizedException if credentials are invalid
      */
     async login(email: string, password: string): Promise<string> {
       // implementation
     }
     ```

3. **Backend Services**:

   - Must include Swagger decorators for ALL endpoints:
     - @ApiTags() on controllers
     - @ApiOperation() describing the endpoint
     - @ApiResponse() for all possible responses
     - @ApiBody(), @ApiParam(), @ApiQuery() as needed
   - When adding new modules/controllers:
     - Add corresponding ApiTag in main.ts swagger configuration
     - Ensure all DTOs have class-validator decorators with @ApiProperty()
   - Require unit tests for EVERY function with minimum 80% coverage
   - Run `pnpm test:coverage` to verify coverage meets requirements

4. **Validation**:

   - Backend routes MUST validate all incoming payloads using DTOs with class-validator
   - Frontend MUST validate forms before sending requests using Zod schemas
   - Validation schemas MUST be typed with shared DTOs using `satisfies z.ZodType<DtoType>`

5. **Testing**:

   - **MANDATORY**: Every function MUST have unit tests with minimum 80% coverage
     - Backend: Test files in `tests/` folder next to source files
     - Packages: Test files in `__tests__/` directory
   - Coverage requirements apply to:
     - All backend services, controllers, guards, etc.
     - All shared library functions
   - Always run in this order before PRs:
     - `pnpm format` (format code with Prettier)
     - `pnpm lint` (run ESLint)
     - `pnpm type-check` (TypeScript type checking)
     - `pnpm test` (run tests)
     - `pnpm test:coverage` (verify coverage meets requirements)

6. **Comments**: Number complex logic steps, update when code changes

7. **Never Modify**:

   - .env files
   - Migration files
   - Files marked with "DO NOT EDIT"

8. **Documentation Updates**:
   - ALWAYS update AI-CONTEXT.md when:
     - Adding new modules or features
     - Changing architecture patterns
     - Adding new dependencies
     - Modifying core functionality
   - ALWAYS update README.md when:
     - Adding new setup requirements
     - Changing configuration options
     - Adding new scripts or commands
     - Modifying deployment process
     - Adding new functions to shared libraries
     - Changing types that affect public APIs
   - ALWAYS update package README.md when:
     - Adding new types to the types package
     - Adding new functions to shared libraries
     - Changing function signatures or behavior
   - Keep .env.example in sync with actual env variables used

## Working with Shared Packages

### Types Package (`packages/types`)

When adding or modifying types in `packages/types`:

1. Add/modify interfaces in appropriate files under `packages/types/src/`
2. Export new types from the appropriate module file
3. Ensure exports are included in `packages/types/src/index.ts`
4. **CRITICAL**: Run `pnpm build-type` to build the distribution files
5. This generates the `dist/` folder with compiled JavaScript and TypeScript declarations
6. Other apps can then import the updated types

### Shared Libraries (`packages/*`)

When adding or modifying code in any shared library package:

1. **Define types first**:

   - Create folder in `packages/types/src/shared-libs/your-lib-name/`
   - Define all types in `index.ts`
   - Export from `packages/types/src/shared-libs/index.ts`
   - Run `pnpm build-type` to build types

2. **Implement the library**:

   - Add/modify code in the package's `src/` directory
   - Import types: `import type {...} from 'types'` (NOT `@repo/types`)
   - Ensure exports are included in `src/index.ts`

3. **Write comprehensive tests**:

   - Create tests in `src/__tests__/` directory
   - Test ALL functions with minimum 80% coverage
   - Run `pnpm test:coverage` to verify coverage

4. **Build and verify**:
   - **CRITICAL**: Run `pnpm build-libs` to build all library packages
   - This generates `dist/` folders with compiled code for all libraries
   - Run `pnpm type-check` to ensure type safety

**Why building is important**: The backend and frontend import from the built `dist/` folders, not the source files. Without running the build commands, your changes won't be available to other apps and you'll get errors.

**Build Commands**:

```bash
# Build types package only
pnpm build-type

# Build all shared libraries
pnpm build-libs

# After building, verify everything works
pnpm type-check
```

**Creating a New Shared Library**:

1. Copy `packages/shared-lib-boilerplate` to `packages/your-lib-name`
2. Update the package.json with new name and description
3. Create types in `packages/types/src/shared-libs/your-lib-name/`
4. Add your code to `src/index.ts` with proper type imports
5. Write unit tests in `src/__tests__/` (minimum 80% coverage)
6. Run `pnpm build-type` then `pnpm build-libs` to build everything
7. Import in other packages:
   - Functions: `import {...} from 'your-lib-name'`
   - Types: `import type {...} from 'types'`
   - Add to dependencies: `"your-lib-name": "workspace:*"`

## Environment Setup

Backend expects these environment variables:

- `DATABASE_NAME`, `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`
- `JWT_SECRET` (strong secret key for JWT signing)
- `JWT_EXPIRES_IN` (token expiration, e.g., "7d", "24h")
- `APP_PORT` (defaults to 3001)
- `THROTTLE_TTL` (rate limit time window in seconds, defaults to 60)
- `THROTTLE_LIMIT` (number of requests per time window, defaults to 10)

Frontend expects:

- `NEXT_PUBLIC_API_URL` (backend URL, defaults to http://localhost:3001)

Frontend runs on port 3000 by default.
