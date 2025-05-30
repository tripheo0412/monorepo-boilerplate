# Backend Boilerplate

A production-ready NestJS backend boilerplate with PostgreSQL, Redis, MikroORM, and comprehensive authentication.

## 🚀 Tech Stack & Features

- **Framework**: NestJS 11 with modular architecture
- **Database**: PostgreSQL with MikroORM (code-first approach)
- **Caching**: Redis for session management and caching
- **Authentication**: JWT-based auth with bcrypt password hashing
- **API Documentation**: Auto-generated Swagger/OpenAPI docs
- **Testing**: Jest for unit and e2e tests
- **Validation**: Joi schema validation for environment variables
- **Type Safety**: Strict TypeScript with shared types
- **Soft Delete**: Built-in soft delete support for all entities
- **Database Migrations**: Automated migration system

## 📋 Prerequisites

- Node.js v22 LTS or higher
- pnpm package manager
- PostgreSQL 14+
- Redis 6+
- Git

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# From the backend-boilerplate directory
pnpm install
```

### 2. Database Setup

Ensure PostgreSQL is running and create a database:

```sql
CREATE DATABASE your_database_name;
```

### 3. Redis Setup

Ensure Redis is running on the default port (6379) or configure accordingly.

### 4. Environment Variables

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_NAME=your_database_name
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Application
APP_PORT=3001
```

### 5. Run Database Migrations

```bash
pnpm migration:run
```

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start with hot reload (port 3001)
pnpm start            # Start production server
pnpm build            # Build for production

# Database
pnpm migration:create # Create new migration
pnpm migration:run    # Run pending migrations
pnpm migration:down   # Rollback last migration

# Testing
pnpm test            # Run unit tests
pnpm test:watch      # Run tests in watch mode
pnpm test:cov        # Run tests with coverage
pnpm test:e2e        # Run end-to-end tests

# Code Quality
pnpm lint            # Run ESLint
pnpm format          # Format with Prettier
pnpm type-check      # TypeScript type checking
```

## 📚 API Documentation

When running in development, Swagger documentation is available at:

```
http://localhost:3001/api-docs
```

### Authentication Endpoints

- `POST /auth/register` - Register new user
  - Body: `{ "email": "string", "password": "string", "firstname": "string", "lastname": "string" }`
  - Returns: User data with success message
- `POST /auth/login` - Login with credentials
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: `{ "access_token": "JWT_TOKEN" }`

### JWT Token Usage

Protected endpoints require the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens expire after 7 days by default (configurable via `JWT_EXPIRES_IN`).

## 🧪 Testing Guide

### Unit Tests

**IMPORTANT**: All code must have minimum 80% test coverage for branches, functions, lines, and statements.

```bash
# Run all unit tests
pnpm test

# Run specific test file
pnpm test auth.service.spec.ts

# Run with coverage (recommended before PRs)
pnpm test:coverage
# or
pnpm test:cov
```

### Coverage Requirements

The project enforces the following minimum coverage thresholds:

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

If coverage falls below these thresholds, the tests will fail.

**Note**: The boilerplate starts with lower coverage due to configuration and module files. As you add features, ensure all new code has proper test coverage to maintain the 80% threshold.

### E2E Tests

```bash
# Run e2e tests
pnpm test:e2e
```

### Writing Tests

- Place unit tests next to the file being tested in a `tests/` folder
- Use `.spec.ts` extension for unit tests
- Place e2e tests in the `test/` directory
- Mock external dependencies using Jest mocks
- Write tests for ALL functions and methods
- Ensure minimum 80% coverage before submitting PRs
- Test edge cases and error scenarios

## 📁 Project Structure

```
src/
├── configs/              # Configuration files
│   ├── database.config.ts
│   ├── env-schema.ts     # Environment validation
│   ├── env.config.ts
│   └── mikro-orm.config.ts
├── decorators/           # Custom decorators
│   └── with-soft-delete.decorator.ts
├── entities/             # Database entities
│   ├── base.entity.ts    # Base entity with common fields
│   ├── index.ts
│   └── user.entity.ts
├── helpers/              # Utility functions
│   └── json-helper.ts
├── migrations/           # Database migrations
├── modules/              # Feature modules
│   ├── auth/            # Authentication module
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── services/
│   │   └── tests/
│   └── base/            # Base app module
│       ├── controllers/
│       ├── services/
│       └── tests/
├── main.ts              # Application entry point
└── migrate.ts           # Migration runner
```

## 🔧 Adding New Features

### Creating a New Module

1. Generate module structure:

```bash
nest g module modules/feature-name
nest g controller modules/feature-name/controllers/feature-name
nest g service modules/feature-name/services/feature-name
```

2. Create DTOs in `modules/feature-name/dto/`
3. Add Swagger decorators to controllers
4. Write unit tests in `modules/feature-name/tests/`
5. Register module in `app.module.ts`

### Creating a New Entity

1. Create entity file in `src/entities/`:

```typescript
import {Entity, Property} from '@mikro-orm/core'
import {BaseEntity} from './base.entity'

@Entity()
@WithSoftDelete()
export class YourEntity extends BaseEntity {
	@Property()
	name!: string
}
```

2. Export from `src/entities/index.ts`
3. Create and run migration:

```bash
pnpm migration:create
pnpm migration:run
```

### Adding New Endpoints

1. Add method to controller with decorators:

```typescript
@Get(':id')
@ApiOperation({ summary: 'Get item by ID' })
@ApiResponse({ status: 200, description: 'Success' })
async findOne(@Param('id') id: string) {
  return this.service.findOne(id);
}
```

2. Implement service method
3. Add unit tests
4. Update API documentation

## 🚀 Deployment Considerations

### Environment Variables

Ensure all required environment variables are set in production:

- **Database**: `DATABASE_NAME`, `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- **Redis**: `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` (if using authentication)
- **JWT**: `JWT_SECRET` (use a strong, random string), `JWT_EXPIRES_IN` (e.g., "7d", "24h")
- **Application**: `NODE_ENV=production`, `APP_PORT`
- **Security**: Enable `POSTGRES_SHOULD_SSL=TRUE` for production databases

### Database

- Use connection pooling for PostgreSQL
- Enable SSL for database connections
- Regular backups and monitoring
- Consider read replicas for scaling

### Security

- Enable CORS with specific origins
- Use helmet for security headers
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- Regular dependency updates

### Performance

- Enable Redis caching for frequently accessed data
- Use database indexes appropriately
- Monitor memory usage and optimize
- Consider horizontal scaling with load balancing

### Monitoring

- Application logs with appropriate levels
- Error tracking (e.g., Sentry)
- Performance monitoring
- Health check endpoints
- Database query monitoring

## 📝 Development Guidelines

1. **Documentation**: Write JSDoc for every function
2. **Testing**: Include unit tests for all services
3. **Validation**: Use DTOs with class-validator
4. **Error Handling**: Use NestJS exception filters
5. **Swagger**: Add decorators for all endpoints
6. **Type Safety**: Leverage TypeScript strictly
7. **Code Style**: Follow ESLint and Prettier rules

## 🤝 Contributing

1. Create feature branch from `main`
2. Write tests for new features
3. Ensure all tests pass
4. Run linting and formatting
5. Create pull request with description

## 📄 License

This project is licensed under the MIT License.
