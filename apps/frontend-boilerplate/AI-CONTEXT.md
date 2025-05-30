# AI Context for Frontend Boilerplate

This file provides context for AI coding assistants to understand the codebase structure and conventions.

## 🎯 Purpose

This is a Next.js 15 frontend boilerplate with TypeScript, Tailwind CSS, shadcn/ui components, and React Query.

## 🏗️ Architecture Overview

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 + CSS variables
- **Components**: shadcn/ui (Radix UI based)
- **Forms**: React Hook Form + Zod
- **Data Fetching**: TanStack Query (React Query) with Axios
- **Testing**: Jest + React Testing Library
- **Component Development**: Storybook for UI development
- **Toast Notifications**: Sonner
- **Authentication**: JWT with automatic token management
- **Shared Types**: TypeScript interfaces from `@repo/types`
- **Validation**: Zod schemas typed with shared DTOs

### Key Patterns

1. **App Router**: File-based routing in `app/` directory
2. **Server Components**: Default, use 'use client' when needed
3. **Component Library**: Reusable UI components in `components/ui/`
4. **Custom Hooks**: Business logic in `hooks/`
5. **API Layer**: Centralized in `lib/api.ts`

## 📁 Directory Structure

```
src/
├── app/               # Next.js app router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   ├── sign-in/      # Sign-in page
│   └── sign-up/      # Sign-up page
├── components/        # React components
│   └── ui/           # shadcn/ui components (each in own folder with stories)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
│   ├── api.ts        # API client
│   └── utils.ts      # Helper functions
├── providers/        # React context providers
└── __tests__/        # Test files
```

## 🔧 Key Files

### Configuration

- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.ts` - Next.js configuration

### Core Files

- `src/app/layout.tsx` - Root layout with providers and Toaster
- `src/providers/query-provider.tsx` - React Query setup
- `src/lib/api.ts` - Axios-based API client with JWT token management
- `src/lib/utils.ts` - Utility functions (cn helper)
- `src/middleware.ts` - Route protection middleware

### Styling

- `src/app/globals.css` - Global styles and CSS variables
- Components use Tailwind classes with cn() helper

## 🛠️ Common Tasks

### Adding a New Page

1. Create folder: `src/app/[page-name]/`
2. Create `page.tsx` for the route
3. Optionally add `layout.tsx` for nested layout
4. Add loading.tsx, error.tsx as needed

### Adding a New Component

```bash
# Using shadcn/ui CLI
npx shadcn@latest add [component-name]

# Manual component
1. Create folder: src/components/ui/[component-name]/
2. Create component: [component-name].tsx
3. Create story: [component-name].stories.tsx
4. Create index: index.ts (export * from './[component-name]')
5. Use cn() helper for className merging
```

### Working with Storybook

```bash
# Start Storybook
pnpm storybook

# View components at http://localhost:6006
```

### Adding a New API Integration

1. Define DTO interfaces in `packages/types/src/`
2. **IMPORTANT**: Run `pnpm build-type` from root to build the types library
3. Add endpoint function in `src/lib/api.ts` using shared types
4. Create Zod schema for validation typed with DTOs
5. Create custom hook using React Query
6. Handle loading/error states in component
7. Validate forms before API calls

### Creating Forms

1. Import DTO types from `@repo/types`
2. Define Zod schema typed with `satisfies z.ZodType<DtoType>`
3. Use React Hook Form with zodResolver
4. Use shadcn/ui form components
5. Handle submission with API integration
6. Frontend validation happens automatically on submit

## 📝 Code Conventions

### Naming

- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useUserProfile`)
- **Utils**: camelCase (e.g., `formatDate`)

### Component Structure

```tsx
// Imports
import {useState} from 'react'
import {cn} from '@/lib/utils'

// Types
interface ComponentProps {
	// props
}

// Component
export function Component({prop}: ComponentProps) {
	// hooks
	// handlers
	// render
}
```

### Styling Approach

- Use Tailwind classes
- Use cn() helper for conditional classes
- Keep component-specific styles in the component
- Use CSS variables for theming

## 🚫 Don'ts

- Don't use CSS modules (use Tailwind)
- Don't fetch data in components (use hooks)
- Don't use 'use client' unless necessary
- Don't import from absolute paths (use @/ alias)
- Don't modify generated UI components directly
- Don't skip form validation before API calls
- Don't define types locally if they should be shared

## 🔐 Security Considerations

- Validate all forms on client AND server
- Use NEXT*PUBLIC* prefix for public env vars
- Never expose sensitive data in client components
- Sanitize user inputs
- Use proper CORS configuration

## 🎨 Best Practices

1. Prefer Server Components (default)
2. Use 'use client' only when needed
3. Colocate related files
4. Use TypeScript strictly
5. Handle loading and error states
6. Optimize images with next/image
7. Use proper SEO meta tags

## 🔄 Typical Workflows

### Page Development Flow

1. Create page route structure
2. Design with shadcn/ui components
3. Add form validation with Zod
4. Integrate with API using React Query
5. Handle loading/error states
6. Add tests

### Component Development Flow

1. Check if shadcn/ui has the component
2. Install or create component
3. Style with Tailwind + cn()
4. Make it reusable with props
5. Add TypeScript types
6. Document usage

## 💡 Tips for AI Assistants

- Check shadcn/ui docs before creating custom components
- Use Server Components by default
- Follow existing patterns in the codebase
- Always use TypeScript with proper types
- Use the @/ import alias
- Include proper error boundaries
- Test with different screen sizes
- Consider accessibility (ARIA labels)
- Use semantic HTML elements
- Create Storybook stories for all UI components
- Keep components in their own folders with stories

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
8. Import in frontend:
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

## 🧩 Component Patterns

### Form Pattern

```tsx
import type {MyFormDto} from '@repo/types'

const formSchema = z.object({
	field: z.string().min(1),
}) satisfies z.ZodType<MyFormDto>

function MyForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		// data is validated and typed as MyFormDto
		// handle submission
	}

	return <Form {...form}>...</Form>
}
```

### Data Fetching Pattern

```tsx
// In a custom hook
export function useData() {
	return useQuery({
		queryKey: ['data'],
		queryFn: () => api.get('/endpoint'),
		// Error handling is automatic via axios interceptor
	})
}

// In a component
function Component() {
	const {data, isLoading, error} = useData()
	// Errors are automatically shown as toasts
	// handle loading and success states
}
```

### API Client Methods

```tsx
// Available methods in api client:
api.get<T>(endpoint: string): Promise<T>
api.post<T>(endpoint: string, data?: unknown): Promise<T>
api.put<T>(endpoint: string, data?: unknown): Promise<T>
api.delete<T>(endpoint: string): Promise<T>

// Auth methods:
api.login(credentials): Promise<LoginResponse>
api.register(data): Promise<RegisterResponse>
api.logout(): void
api.isAuthenticated(): boolean
```
