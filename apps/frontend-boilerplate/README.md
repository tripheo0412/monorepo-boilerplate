# Frontend Boilerplate

A modern Next.js 15 frontend boilerplate with App Router, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Tech Stack & Features

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript 5.8 with strict mode
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Testing**: Jest with React Testing Library
- **API Integration**: Axios with automatic JWT token management
- **Authentication**: JWT-based auth with hooks and middleware
- **Toast Notifications**: Sonner for user feedback
- **UI Components**: Pre-styled, accessible components from shadcn/ui
- **Component Development**: Storybook for isolated component development
- **Development**: Fast refresh with Turbopack
- **Code Quality**: ESLint, Prettier, and TypeScript checks

## 📋 Prerequisites

- Node.js v22 LTS or higher
- pnpm package manager
- Git
- Backend API running on port 3001 (see backend-boilerplate)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# From the frontend-boilerplate directory
pnpm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your configuration.

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm preview      # Preview production build locally

# Testing
pnpm test         # Run Jest tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format with Prettier
pnpm type-check   # TypeScript type checking

# Component Development
pnpm storybook    # Start Storybook on port 6006
pnpm build-storybook # Build static Storybook
```

## 📁 Project Structure

```
src/
├── __tests__/           # Test files
│   └── sign-in.test.tsx
├── app/                 # Next.js App Router pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── not-found.tsx    # 404 page
│   ├── page.tsx         # Home page
│   ├── sign-in/         # Sign in page
│   └── sign-up/         # Sign up page
├── components/          # React components
│   └── ui/              # shadcn/ui components
│       ├── button/      # Button component
│       │   ├── button.tsx
│       │   ├── button.stories.tsx
│       │   └── index.ts
│       ├── card/        # Card component
│       │   ├── card.tsx
│       │   ├── card.stories.tsx
│       │   └── index.ts
│       ├── checkbox/    # Checkbox component
│       │   ├── checkbox.tsx
│       │   ├── checkbox.stories.tsx
│       │   └── index.ts
│       ├── input/       # Input component
│       │   ├── input.tsx
│       │   ├── input.stories.tsx
│       │   └── index.ts
│       ├── label/       # Label component
│       │   ├── label.tsx
│       │   ├── label.stories.tsx
│       │   └── index.ts
│       ├── separator/   # Separator component
│       │   ├── separator.tsx
│       │   ├── separator.stories.tsx
│       │   └── index.ts
│       └── sonner/      # Toast notifications
│           ├── sonner.tsx
│           ├── sonner.stories.tsx
│           └── index.ts
├── hooks/               # Custom React hooks
│   └── use-auth.ts      # Authentication hook
├── lib/                 # Utility functions
│   ├── api.ts           # Axios API client with JWT
│   └── utils.ts         # Helper functions
├── providers/           # React context providers
│   └── query-provider.tsx # TanStack Query provider
├── middleware.ts        # Next.js middleware for auth
└── index.ts             # Barrel exports
```

## 🎨 Component Library

This project uses **shadcn/ui** components, which are:

- Fully customizable and owned by your codebase
- Built with Radix UI primitives for accessibility
- Styled with Tailwind CSS
- Located in `src/components/ui/`

### Adding New Components

```bash
# Add a new shadcn/ui component
npx shadcn-ui@latest add [component-name]

# Example: Add a dialog component
npx shadcn-ui@latest add dialog
```

### Available Components

- **Button**: Various button styles and sizes
- **Card**: Container component with header and content
- **Input**: Form input with label support
- **Checkbox**: Accessible checkbox component
- **Label**: Form label component
- **Separator**: Visual separator line
- **Sonner**: Toast notification system

### Viewing Components in Storybook

```bash
# Start Storybook development server
pnpm storybook

# Open http://localhost:6006 in your browser
```

Each component has its own story file (`.stories.tsx`) showcasing different states and variations.

## 🧪 Testing Guide

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test sign-in.test.tsx
```

### Writing Tests

Example test structure:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '@/components/component-name';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);

    await user.click(screen.getByRole('button'));
    // Assert expected behavior
  });
});
```

### Testing Best Practices

- Test user behavior, not implementation details
- Use semantic queries (getByRole, getByLabelText)
- Mock API calls using MSW or Jest mocks
- Test accessibility with jest-axe
- Keep tests focused and isolated

## 🔧 Adding New Features

### Creating a New Page

1. Create a new directory in `src/app/`:

```bash
mkdir src/app/your-feature
```

2. Add `page.tsx`:

```typescript
export default function YourFeaturePage() {
  return (
    <div>
      <h1>Your Feature</h1>
    </div>
  );
}
```

3. Add loading and error states as needed:

- `loading.tsx` - Loading UI
- `error.tsx` - Error boundary
- `layout.tsx` - Nested layout

### Creating a New Component

1. Create component file:

```typescript
// src/components/your-component.tsx
interface YourComponentProps {
  // Define props
}

export function YourComponent({ ...props }: YourComponentProps) {
  return <div>Component content</div>;
}
```

2. Add tests in `__tests__/`
3. Export from barrel file if needed

### Adding API Integration

1. Use the API client methods in `src/lib/api.ts`:

```typescript
// Available methods:
api.get<T>(endpoint: string): Promise<T>
api.post<T>(endpoint: string, data?: unknown): Promise<T>
api.put<T>(endpoint: string, data?: unknown): Promise<T>
api.delete<T>(endpoint: string): Promise<T>

// Authentication methods:
api.login(credentials): Promise<LoginResponse>
api.register(data): Promise<RegisterResponse>
api.logout(): void
api.isAuthenticated(): boolean
```

2. Use with TanStack Query:

```typescript
import {useQuery} from '@tanstack/react-query'
import {api} from '@/lib/api'

export function useData() {
	return useQuery({
		queryKey: ['data'],
		queryFn: () => api.get('/endpoint'),
		// Errors are automatically handled and shown as toasts
	})
}
```

### Authentication Flow

1. **JWT Token Management**: Tokens are automatically stored in cookies and attached to requests
2. **Protected Routes**: Middleware handles route protection (configure in `src/middleware.ts`)
3. **Error Handling**: 401 errors automatically redirect to sign-in
4. **Toast Notifications**: All errors are shown as toast notifications

### Error Handling

The API client includes automatic error handling:

- Network errors show user-friendly messages
- Validation errors display field-specific feedback
- 401 errors trigger automatic logout and redirect
- All errors are displayed as toast notifications

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Self-Hosted Deployment

1. Build the application:

```bash
pnpm build
```

2. Start the production server:

```bash
pnpm start
```

### Docker Deployment

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
RUN corepack enable && pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]
```

### Environment Variables

Ensure all required environment variables are set:

- `NEXT_PUBLIC_API_URL` - Backend API URL (defaults to http://localhost:3001)
- Any other public environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🎯 Performance Optimization

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority
/>
```

### Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting (automatic with App Router)
- Lazy loading with React.lazy()

### Caching Strategies

- Static generation for marketing pages
- ISR for dynamic content
- Client-side caching with React Query

## 🔒 Security Considerations

- Validate all user inputs
- Use HTTPS in production
- Implement CSP headers
- Sanitize dynamic content
- Keep dependencies updated
- Use environment variables for sensitive data

## 📝 Development Guidelines

1. **Component Structure**: Keep components small and focused
2. **Type Safety**: Leverage TypeScript for all code
3. **Accessibility**: Use semantic HTML and ARIA attributes
4. **Testing**: Write tests for critical user flows
5. **Performance**: Monitor bundle size and load times
6. **Code Style**: Follow ESLint and Prettier rules
7. **Documentation**: Comment complex logic

## 🤝 Contributing

1. Create feature branch from `main`
2. Follow the coding standards
3. Write tests for new features
4. Ensure all tests pass
5. Run linting and type checking
6. Create pull request with description

## 📄 License

This project is licensed under the MIT License.
