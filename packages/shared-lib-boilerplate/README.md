# Shared Library Boilerplate

A template for creating shared utility libraries in the AI Document Agent monorepo.

## 📦 Purpose

This is a boilerplate package that serves as a starting point for creating new shared libraries. Clone this folder when you need to create a new shared package with utilities, helpers, or common functionality.

## 🚀 How to Use This Boilerplate

### Creating a New Shared Library

1. **Clone this folder** with a new name:

   ```bash
   cp -r packages/shared-lib-boilerplate packages/your-new-lib
   cd packages/your-new-lib
   ```

2. **Update package.json**:

   ```json
   {
   	"name": "@repo/your-new-lib",
   	"version": "1.0.0",
   	"description": "Description of your library"
   }
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Add your code** in `src/index.ts`

5. **Build the library**:
   ```bash
   pnpm build-libs
   ```

## 📁 Structure

```
shared-lib-boilerplate/
├── src/
│   └── index.ts         # Main entry point (add your code here)
├── dist/                # Built output (generated)
├── .prettierrc.json     # Prettier configuration
├── .prettierignore      # Prettier ignore patterns
├── eslint.config.mjs    # ESLint configuration
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
└── tsup.config.ts       # Build configuration
```

## 🛠️ Development

### Available Scripts

- `pnpm build-libs` - Build the library for distribution
- `pnpm test` - Run unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Check TypeScript types
- `pnpm format` - Format code with Prettier

### Building the Library

**IMPORTANT**: After making changes, always build the library:

```bash
cd packages/your-lib-name
pnpm build-libs
```

This generates:

- `dist/index.js` - CommonJS bundle
- `dist/index.mjs` - ESM bundle
- `dist/index.d.ts` - TypeScript declarations

## 📋 Example Library Code

Here's an example of what you might add to `src/index.ts`:

```typescript
/**
 * Formats a date to a human-readable string
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date)
}

/**
 * Delays execution for a specified number of milliseconds
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Deeply clones an object
 * @param obj Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}
```

## 🔧 Configuration Details

### TypeScript Configuration

- **Target**: ES2022
- **Module**: ES2022
- **Strict Mode**: Enabled
- **Output**: Dual package (ESM and CommonJS)

### Build Configuration (tsup)

- **Entry**: `src/index.ts`
- **Formats**: ESM and CommonJS
- **TypeScript Declarations**: Generated
- **Source Maps**: Included
- **Clean**: Output directory cleaned before build

### Linting and Formatting

- **ESLint**: TypeScript-aware with Prettier integration
- **Prettier**: Consistent code formatting

## 🧪 Testing

### Unit Testing Requirements

**IMPORTANT**: Every function in shared libraries MUST have unit tests with at least 80% coverage.

### Writing Tests

1. Create test files in `src/__tests__/` directory
2. Name test files as `[filename].test.ts`
3. Write comprehensive tests for all functions
4. Test edge cases and error scenarios
5. Use descriptive test names

### Example Test Structure

```typescript
import {yourFunction} from '../index'

describe('yourFunction', () => {
	it('should handle normal cases', () => {
		expect(yourFunction('input')).toBe('expected output')
	})

	it('should handle edge cases', () => {
		expect(yourFunction('')).toBe('fallback')
	})

	it('should handle errors gracefully', () => {
		expect(() => yourFunction(null)).not.toThrow()
	})
})
```

### Coverage Requirements

- Minimum 80% coverage for all metrics (branches, functions, lines, statements)
- Run `pnpm test:coverage` to check coverage
- Coverage report is generated in `coverage/` directory

## 🚨 Important Guidelines

1. **Always build after changes**: Run `pnpm build-libs`
2. **Export everything**: Use named exports from `index.ts`
3. **Document functions**: Add JSDoc comments to all exported functions
4. **Test everything**: Write unit tests for ALL functions (minimum 80% coverage)
5. **Keep it focused**: Each library should have a single, clear purpose
6. **No side effects**: Libraries should be pure functions/utilities
7. **Version carefully**: Changes affect all consuming packages
8. **Update documentation**: Update README when adding new functions

## 📚 What to Add When Creating a Real Library

When using this boilerplate for a real library, consider adding:

1. **Tests**: Set up Jest or Vitest with test files
2. **Examples**: Add usage examples in the README
3. **API Documentation**: Document all exported functions
4. **Changelog**: Track version changes
5. **CI/CD**: GitHub Actions for testing and building
6. **Development mode**: Add a watch script for development

## 📝 Types Management

### Defining Types for Your Library

1. **Create types in the types package**:

   - Navigate to `packages/types/src/shared-libs/`
   - Create a folder with your library name (e.g., `your-lib-name/`)
   - Define all types in `index.ts`

2. **Import types in your library**:

   ```typescript
   import type {YourType, AnotherType} from 'types'
   ```

3. **Benefits of centralized types**:
   - Single source of truth for all types
   - Easy type sharing between library and consuming apps
   - Better IntelliSense support
   - Prevents type duplication

### Example Type Definition

In `packages/types/src/shared-libs/your-lib-name/index.ts`:

```typescript
export interface ConfigOptions {
	apiUrl: string
	timeout?: number
	retryAttempts?: number
}

export type ResultStatus = 'success' | 'error' | 'pending'
```

## 🔗 Using Your Library

After building, other packages can import your library:

```typescript
// In backend or frontend apps
import {formatDate, delay, deepClone} from 'your-lib-name'
import type {ConfigOptions} from 'types' // Types are imported separately

const formatted = formatDate(new Date())
await delay(1000)
const cloned = deepClone({foo: 'bar'})
```

**Note**: We use workspace dependencies, not npm packages. In package.json:

```json
{
	"dependencies": {
		"your-lib-name": "workspace:*",
		"types": "workspace:*"
	}
}
```

## ⚡ Quick Start Checklist

### When Creating a New Library:

1. **Copy the boilerplate**:

   - [ ] Clone this folder: `cp -r packages/shared-lib-boilerplate packages/your-lib-name`
   - [ ] Update `package.json` (name, description)

2. **Create type definitions**:

   - [ ] Create folder: `packages/types/src/shared-libs/your-lib-name/`
   - [ ] Create `index.ts` with your types
   - [ ] Export from `packages/types/src/shared-libs/index.ts`
   - [ ] Run `pnpm build-type` to build types

3. **Implement your library**:

   - [ ] Replace example code in `src/index.ts`
   - [ ] Import types: `import type {...} from 'types'`
   - [ ] Create tests in `src/__tests__/`
   - [ ] Update README.md with your library's documentation

4. **Build and test**:

   - [ ] Run `pnpm install`
   - [ ] Run `pnpm test` to ensure tests pass
   - [ ] Run `pnpm test:coverage` to check coverage (minimum 80%)
   - [ ] Run `pnpm build-libs` to build the library

5. **Use in apps**:

   - [ ] Add to dependencies: `"your-lib-name": "workspace:*"`
   - [ ] Import functions: `import {...} from 'your-lib-name'`
   - [ ] Import types: `import type {...} from 'types'`

6. **Documentation**:
   - [ ] Update this README with your library specifics
   - [ ] Document all exported functions with JSDoc
   - [ ] Add usage examples
   - [ ] Commit your changes
