# Project Structure Documentation

This document explains the monorepo structure and how to use the boilerplates effectively.

## 🏗️ Monorepo Structure

```
.
├── apps/                      # Application projects
│   ├── backend-boilerplate/   # NestJS backend template
│   └── frontend-boilerplate/  # Next.js frontend template
├── packages/                  # Shared packages
│   └── types/                # Shared TypeScript types
├── CLAUDE.md                 # AI assistant instructions
├── PROJECT-STRUCTURE.md      # This file
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # PNPM workspace config
└── turbo.json               # Turborepo config
```

## 🚀 Using the Boilerplates

### Creating a New Backend App

1. **Copy the boilerplate:**

   ```bash
   cp -r apps/backend-boilerplate apps/my-backend
   ```

2. **Update package.json:**

   - Change `"name": "backend-boilerplate"` to `"name": "my-backend"`
   - Update description

3. **Update environment variables:**

   - Copy `.env.example` to `.env`
   - Update `DATABASE_NAME` to your database name
   - Configure other variables as needed

4. **Update Swagger documentation:**

   - In `src/main.ts`, update:
     - API title and description
     - Contact information
     - Server URLs

5. **Clean up example code:**

   - Remove or modify the example auth module if not needed
   - Update the base route in `AppController`

6. **Initialize database:**
   ```bash
   cd apps/my-backend
   pnpm install
   pnpm migration:create Initial
   pnpm migration:up
   ```

### Creating a New Frontend App

1. **Copy the boilerplate:**

   ```bash
   cp -r apps/frontend-boilerplate apps/my-frontend
   ```

2. **Update package.json:**

   - Change `"name": "frontend-boilerplate"` to `"name": "my-frontend"`
   - Update description

3. **Update configuration:**

   - Copy `.env.example` to `.env.local`
   - Update `NEXT_PUBLIC_API_URL` to your backend URL
   - Update app name in `layout.tsx` metadata

4. **Clean up example code:**

   - Remove or modify sign-in/sign-up pages if not needed
   - Update the home page content
   - Customize the layout

5. **Install and run:**
   ```bash
   cd apps/my-frontend
   pnpm install
   pnpm dev
   ```

## 📦 Shared Packages

### Using types

The `packages/types` directory contains shared TypeScript types between frontend and backend.

Install it using "types": "workspace:*" in package.json dependencies

**In backend:**

```typescript
import {UserType} from 'types'
```

**In frontend:**

```typescript
import {UserType} from 'types'
```

**Adding new types:**

1. Create in `packages/types/src/[feature].ts`
2. Export from `packages/types/src/index.ts`
3. Run `pnpm build` in the types package

## 🛠️ Development Workflow

### Running Everything

```bash
# From root directory
pnpm dev              # Runs all apps
pnpm build           # Builds all apps
pnpm test            # Tests all apps
pnpm lint            # Lints all apps
pnpm format          # Formats all code
```

### Running Specific Apps

```bash
# Run only backend
pnpm dev --filter=backend-boilerplate

# Run only frontend
pnpm dev --filter=frontend-boilerplate

# Run multiple specific apps
pnpm dev --filter=my-backend --filter=my-frontend
```

### Adding Dependencies

**To a specific app:**

```bash
pnpm add express --filter=my-backend
pnpm add react-query --filter=my-frontend
```

**To the workspace root:**

```bash
pnpm add -w eslint
```

**To shared packages:**

```bash
pnpm add zod --filter=types
```

## 📝 Documentation Standards

Each app should have:

1. **README.md** - Setup and usage instructions
2. **AI-CONTEXT.md** - Context for AI assistants
3. **.env.example** - Example environment variables
4. **API documentation** - Swagger for backends
5. **Component documentation** - Storybook for frontends (optional)

## 🎯 Best Practices

### For Backend Apps

1. Keep the modular structure
2. Use dependency injection
3. Write tests for services
4. Document APIs with Swagger
5. Use DTOs for validation
6. Handle errors properly
7. Use transactions for DB operations

### For Frontend Apps

1. Use Server Components by default
2. Keep components small and focused
3. Use shadcn/ui components
4. Handle loading and error states
5. Optimize images and fonts
6. Write tests for critical paths
7. Use TypeScript strictly

### For Monorepo

1. Share types via packages
2. Keep apps independent
3. Use workspace commands
4. Version packages properly
5. Document everything
6. Use consistent tooling

## 🔧 Customization Guide

### Backend Customization

- **Database**: Change PostgreSQL to MongoDB by updating MikroORM config
- **Auth**: Implement JWT by updating auth.service.ts
- **API**: Add GraphQL by installing @nestjs/graphql
- **Queue**: Add Bull for job queues
- **WebSocket**: Add Socket.io support

### Frontend Customization

- **UI Library**: Replace shadcn/ui with MUI or Ant Design
- **State Management**: Add Redux or Zustand
- **Styling**: Replace Tailwind with styled-components
- **Data Fetching**: Replace React Query with SWR
- **Authentication**: Add NextAuth.js

## 🚨 Common Issues

### Port Conflicts

- Backend default: 3001
- Frontend default: 3000
- Change in .env files if needed

### Database Connection

- Ensure PostgreSQL is running
- Check credentials in .env
- Run migrations

### Type Errors

- Run `pnpm build` in packages/types
- Restart TypeScript server
- Check import paths

### Build Failures

- Clear node_modules and reinstall
- Check for circular dependencies
- Ensure all env variables are set

## 🔗 Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [PNPM Workspaces](https://pnpm.io/workspaces)
- [NestJS Docs](https://nestjs.com/)
- [Next.js Docs](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
