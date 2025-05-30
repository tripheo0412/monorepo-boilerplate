/**
 * Example shared library utilities.
 * Replace these with your actual utility functions when creating a new library.
 */

import type {DateFormatOptions, Nullable, JsonParseResult} from 'types'

/**
 * Example: Formats a date to a human-readable string
 * @param date The date to format
 * @param options Optional formatting options
 * @returns Formatted date string
 */
export function formatDate(date: Date, options?: DateFormatOptions): string {
	// Handle invalid date
	if (isNaN(date.getTime())) {
		return 'Invalid Date'
	}

	const locale = options?.locale || 'en-US'
	const formatOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: options?.timeZone,
	}

	// Adjust format based on options
	if (options?.format === 'short') {
		formatOptions.month = 'short'
	} else if (options?.format === 'full') {
		formatOptions.weekday = 'long'
	}

	return new Intl.DateTimeFormat(locale, formatOptions).format(date)
}

/**
 * Example: Delays execution for a specified number of milliseconds
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Example: Checks if a value is null or undefined
 * @param value Value to check
 * @returns True if value is null or undefined
 */
export function isNil(value: unknown): value is Nullable {
	return value === null || value === undefined
}

/**
 * Example: Safely parses JSON with a fallback value
 * @param json JSON string to parse
 * @param fallback Fallback value if parsing fails
 * @returns Parsed object or fallback value
 */
export function safeJsonParse<T = unknown>(
	json: string,
	fallback: T,
): JsonParseResult<T> {
	// Handle non-string inputs
	if (typeof json !== 'string') {
		return fallback
	}

	try {
		return JSON.parse(json) as T
	} catch {
		return fallback
	}
}

// Add more utility functions as needed for your specific library
