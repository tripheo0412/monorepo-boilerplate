# @repo/types

Shared TypeScript type definitions for the AI Document Agent monorepo.

## 📦 Purpose

This package contains all shared TypeScript interfaces and types used across the frontend and backend applications. It ensures type safety and consistency throughout the monorepo.

## 📁 Structure

```
src/
├── app.ts                    # Application-wide DTOs
├── auth.ts                   # Authentication-related DTOs
├── base.ts                   # Base entity DTOs
├── shared-libs/              # Types for shared libraries
│   ├── index.ts             # Export all shared lib types
│   └── shared-lib-boilerplate/  # Example library types
│       └── index.ts
└── index.ts                  # Main export file
```

## 🚀 Usage

### In Backend (NestJS)

```typescript
import type {LoginDto, RegisterDto, UserDto} from 'types'

// Implement the interface in a class with validation decorators
export class LoginDto implements ILoginDto {
	@IsEmail()
	@ApiProperty()
	email: string

	@IsString()
	@ApiProperty()
	password: string
}
```

### In Frontend (Next.js)

```typescript
import type {LoginDto, RegisterDto} from 'types'
import {z} from 'zod'

// Use with Zod for validation
const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
}) satisfies z.ZodType<LoginDto>
```

### In Shared Libraries

```typescript
import type {DateFormatOptions, Nullable} from 'types'

export function formatDate(date: Date, options?: DateFormatOptions): string {
	// Implementation using the imported types
}
```

## 🛠️ Development

### Building the Package

**IMPORTANT**: After making any changes to the types, you MUST build the package:

```bash
cd packages/types
pnpm build-type
```

This generates the `dist/` folder with:

- `index.js` - CommonJS bundle
- `index.mjs` - ESM bundle
- `index.d.ts` - TypeScript declarations

### Why Building is Required

Other packages import from the built `dist/` folder, not the source files. Without running `build-type`, your changes won't be available to other apps and you'll get TypeScript errors.

### Available Scripts

- `pnpm build-type` - Build the package for distribution
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Check TypeScript types
- `pnpm format` - Format code with Prettier

## 📋 Adding New Types

1. Create a new file in `src/` or add to an existing file
2. Define your interfaces/types
3. Export from the appropriate module file
4. Add export to `src/index.ts`
5. Run `pnpm build-type` to build the package
6. Import in your apps using `@repo/types`

### Example: Adding a New Feature DTO

```typescript
// src/feature.ts
export interface CreateFeatureDto {
	name: string
	description: string
	enabled: boolean
}

export interface FeatureDto extends BaseEntityDto {
	name: string
	description: string
	enabled: boolean
}
```

Then in `src/index.ts`:

```typescript
export * from './feature'
```

## 🔧 Configuration

- **TypeScript**: Strict mode enabled with ES2022 target
- **Module**: Dual package (ESM and CommonJS)
- **Build Tool**: tsup for fast bundling

## 📚 Type Categories

### Base Types (`base.ts`)

- `BaseEntityDto` - Common entity properties (id, timestamps)

### Authentication Types (`auth.ts`)

- `LoginDto` - Login request payload
- `RegisterDto` - Registration request payload
- `LoginResponseDto` - Login response with token
- `RegisterResponseDto` - Registration response
- `UserDto` - User information (without sensitive data)
- `UserEntityDto` - Full user entity

### Application Types (`app.ts`)

- `HelloResponseDto` - Example response DTO

### Shared Library Types (`shared-libs/*`)

- `DateFormatOptions` - Options for date formatting
- `Nullable` - Type for null/undefined values
- `JsonParseResult<T>` - Result type for JSON parsing
- `Result<T, E>` - Generic result type for operations

## 🚨 Important Notes

1. **Always build after changes**: Run `pnpm build-type`
2. **Use type imports**: Prefer `import type` for better tree-shaking
3. **Keep DTOs simple**: Only include serializable data
4. **No business logic**: This package should only contain type definitions
5. **Version carefully**: Changes here affect all consuming packages
6. **Import correctly**: Use `import type {...} from 'types'` NOT `@repo/types`
7. **Update docs**: Always update README when adding new types
