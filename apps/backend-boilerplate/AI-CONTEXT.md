# AI Context for Backend Boilerplate

This file provides context for AI coding assistants (like Claude, GitHub Copilot, etc.) to understand the codebase structure and conventions.

## 🎯 Purpose

This is a NestJS backend boilerplate with PostgreSQL, Redis, authentication, caching, rate limiting, and health checks.

## 🏗️ Architecture Overview

### Core Technologies

- **Framework**: NestJS 11 (Node.js framework)
- **Database**: PostgreSQL with MikroORM
- **Cache**: Redis with @keyv/redis
- **Authentication**: JWT-based with @nestjs/jwt and bcrypt
- **API Docs**: Swagger/OpenAPI
- **Testing**: Jest
- **Shared Types**: TypeScript interfaces in `packages/types`

### Key Patterns

1. **Modular Architecture**: Each feature is a module in `src/modules/`
2. **Repository Pattern**: MikroORM entities with soft delete
3. **DTO Pattern**:
   - Interfaces defined in `packages/types` for type safety
   - Classes with validation in backend using class-validator
   - All DTOs validated on input
4. **Guard Pattern**: Auth and rate limiting via guards
5. **Service Pattern**: Business logic separated from controllers
6. **Entity Naming**: All entities must have **Entity** suffix

## 📁 Directory Structure

```
src/
├── configs/           # Configuration files
├── decorators/        # Custom decorators
├── entities/          # Database entities
├── helpers/           # Utility functions
├── migrations/        # Database migrations
├── modules/           # Feature modules
│   ├── auth/         # Authentication module
│   ├── base/         # Main app module
│   ├── cache/        # Caching service
│   └── health/       # Health checks
└── main.ts           # Application entry point
```

## 🔧 Key Files

### Configuration

- `src/configs/env-schema.ts` - Environment variable validation
- `src/configs/database.config.ts` - Database configuration
- `src/configs/mikro-orm.config.ts` - ORM configuration

### Base Classes

- `src/entities/base.entity.ts` - Base entity with soft delete
- `src/decorators/with-soft-delete.decorator.ts` - Soft delete decorator

### Main Application

- `src/main.ts` - Bootstrap, CORS, Swagger setup
- `src/modules/base/app.module.ts` - Root module

## 🛠️ Common Tasks

### Adding a New Module

1. Create folder: `src/modules/[module-name]/`
2. Create module file: `[module-name].module.ts`
3. Create subfolders: `controllers/`, `services/`, `dto/`, `tests/`
4. Import in `app.module.ts`
5. Add Swagger tag in `main.ts`

### Adding a New Entity

1. Create in `src/entities/[entity-name].entity.ts` with **Entity** suffix (e.g., `UserEntity`, `ProductEntity`)
2. Extend `BaseEntity`
3. Export from `src/entities/index.ts`
4. Create corresponding DTOs in `packages/types/src/`:
   - Entity DTO interface extending `BaseEntityDto`
   - Request/Response DTOs as needed
5. **IMPORTANT**: Run `pnpm build-type` from root to build the types library
6. Generate migration: `pnpm migration:create`

### Adding a New API Endpoint

1. Define DTO interfaces in `packages/types/src/` for request/response
2. **IMPORTANT**: Run `pnpm build-type` from root to build the types library
3. Create DTO classes in module's `dto/` folder:
   - Implement interfaces from `types`
   - Add class-validator decorators for validation
   - Add @ApiProperty() decorators for Swagger
4. Create controller method with Swagger decorators
5. Implement service method with JSDoc
6. Write comprehensive unit tests (minimum 80% coverage)
7. Run `pnpm test:coverage` to verify coverage
8. Update API documentation

## 📝 Code Conventions

### Naming

- **Files**: kebab-case (e.g., `user-profile.entity.ts`)
- **Classes**: PascalCase with proper suffixes:
  - Entities: `UserProfileEntity` (always with **Entity** suffix)
  - DTOs: `CreateUserDto`, `UpdateUserDto`
  - Services: `UserService`
  - Controllers: `UserController`
- **Methods**: camelCase (e.g., `getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE

### Documentation

- Every function needs JSDoc with @param, @returns, @throws
- Controllers need @ApiTags, @ApiOperation, @ApiResponse
- DTOs need @ApiProperty for each field

### Testing

- Unit tests: `[name].spec.ts`
- E2E tests: `[name].e2e-spec.ts`
- Test file next to source file in `tests/` folder
- **MANDATORY**: Minimum 80% code coverage for all metrics (branches, functions, lines, statements)
- Run `pnpm test:coverage` to check coverage

## 🚫 Don'ts

- Don't modify migration files after they're created
- Don't use `any` type - use proper types
- Don't skip validation on DTOs
- Don't put business logic in controllers
- Don't forget to handle errors properly

## 🔐 Security Considerations

- All endpoints are rate limited by default
- Use guards for authentication
- Validate all inputs with DTOs
- Never expose sensitive data in responses
- Use environment variables for secrets

## 🎨 Best Practices

1. Keep controllers thin - delegate to services
2. Use dependency injection
3. Write pure functions when possible
4. Handle errors with proper exception filters
5. Use transactions for database operations
6. Cache expensive operations
7. Log important operations
8. Write unit tests for ALL functions (minimum 80% coverage)
9. Run `pnpm test:coverage` before submitting PRs

## 🔄 Typical Workflows

### API Development Flow

1. Define DTO with validation
2. Create controller endpoint
3. Implement service logic
4. Add Swagger documentation
5. Write unit tests
6. Test with Swagger UI

### Database Change Flow

1. Modify entity
2. Generate migration
3. Review migration file
4. Run migration
5. Update related DTOs/services

## 💡 Tips for AI Assistants

- Check existing patterns before implementing new features
- Use the same naming conventions as existing code
- Always add proper TypeScript types
- Include error handling in all async operations
- Follow the established module structure
- Add comprehensive JSDoc comments
- Include Swagger decorators on all endpoints

## 📦 Using Shared Libraries

### Available Packages

- `types` - Shared TypeScript type definitions
- `shared-lib-boilerplate` - Template for creating new libraries

### Creating a New Shared Library

1. Copy `packages/shared-lib-boilerplate` to new folder
2. Update package.json name and description
3. Create types in `packages/types/src/shared-libs/your-lib-name/`
4. Add utility functions to src/index.ts
5. Write unit tests (minimum 80% coverage)
6. Run `pnpm build-type` then `pnpm build-libs` from root
7. Add to dependencies: `"your-lib-name": "workspace:*"`
8. Import in backend:
   - Functions: `import { utilityName } from 'your-lib-name'`
   - Types: `import type { TypeName } from 'types'`

### Important Build Commands

```bash
# After modifying types
pnpm build-type

# After modifying any shared library
pnpm build-libs

# Check test coverage
pnpm test:coverage
```

### Documentation Requirements

**ALWAYS update documentation when:**

- Adding new functions to shared libraries
- Changing function signatures
- Adding new types
- Modifying existing behavior
- Update both README.md and JSDoc comments

**Remember**:

- Always build packages after changes!
- Every function needs unit tests!
- Update docs immediately after code changes!
