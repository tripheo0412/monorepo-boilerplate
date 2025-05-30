/**
 * Type definitions for shared-lib-boilerplate.
 * These types should be imported by the shared library and any consuming applications.
 */

/**
 * Options for formatting dates in the shared library
 */
export interface DateFormatOptions {
	locale?: string
	timeZone?: string
	format?: 'short' | 'medium' | 'long' | 'full'
}

/**
 * Result type for operations that can fail
 */
export interface Result<T, E = Error> {
	success: boolean
	data?: T
	error?: E
}

/**
 * Type guard result for isNil function
 */
export type Nullable = null | undefined

/**
 * JSON parse result type
 */
export type JsonParseResult<T> = T | unknown
