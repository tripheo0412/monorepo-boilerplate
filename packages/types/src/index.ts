/**
 * Shared TypeScript types for the monorepo.
 */

// Export base DTOs
export * from './base'

// Export auth DTOs
export * from './auth'

// Export app DTOs
export * from './app'

// Export shared library types
export * from './shared-libs'

// Legacy interfaces (kept for backward compatibility)
export interface Message {
	text: string
}
