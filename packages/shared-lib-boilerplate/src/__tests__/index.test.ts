import {formatDate, delay, isNil, safeJsonParse} from '../index'

describe('formatDate', () => {
	it('should format date correctly with default options', () => {
		const date = new Date('2024-01-15T12:00:00Z')
		const formatted = formatDate(date)
		// Note: The exact output depends on the system's locale and timezone
		expect(formatted).toMatch(/January/)
		expect(formatted).toMatch(/15/)
		expect(formatted).toMatch(/2024/)
	})

	it('should format date with short format option', () => {
		const date = new Date('2024-01-15T12:00:00Z')
		const formatted = formatDate(date, {format: 'short'})
		expect(formatted).toMatch(/Jan/)
		expect(formatted).toMatch(/15/)
		expect(formatted).toMatch(/2024/)
	})

	it('should format date with full format option', () => {
		const date = new Date('2024-01-15T12:00:00Z')
		const formatted = formatDate(date, {format: 'full'})
		// Should include weekday
		expect(formatted).toMatch(
			/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/,
		)
		expect(formatted).toMatch(/January/)
		expect(formatted).toMatch(/15/)
		expect(formatted).toMatch(/2024/)
	})

	it('should format date with custom locale', () => {
		const date = new Date('2024-01-15T12:00:00Z')
		const formatted = formatDate(date, {locale: 'es-ES'})
		// Spanish month name
		expect(formatted).toMatch(/enero/)
		expect(formatted).toMatch(/15/)
		expect(formatted).toMatch(/2024/)
	})

	it('should handle invalid date', () => {
		const invalidDate = new Date('invalid')
		const formatted = formatDate(invalidDate)
		expect(formatted).toBe('Invalid Date')
	})
})

describe('delay', () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	afterEach(() => {
		jest.useRealTimers()
	})

	it('should resolve after specified milliseconds', async () => {
		const delayPromise = delay(1000)

		// Fast-forward time
		jest.advanceTimersByTime(1000)

		await expect(delayPromise).resolves.toBeUndefined()
	})

	it('should handle zero delay', async () => {
		const delayPromise = delay(0)
		jest.advanceTimersByTime(0)
		await expect(delayPromise).resolves.toBeUndefined()
	})
})

describe('isNil', () => {
	it('should return true for null', () => {
		expect(isNil(null)).toBe(true)
	})

	it('should return true for undefined', () => {
		expect(isNil(undefined)).toBe(true)
	})

	it('should return false for zero', () => {
		expect(isNil(0)).toBe(false)
	})

	it('should return false for empty string', () => {
		expect(isNil('')).toBe(false)
	})

	it('should return false for false', () => {
		expect(isNil(false)).toBe(false)
	})

	it('should return false for empty array', () => {
		expect(isNil([])).toBe(false)
	})

	it('should return false for empty object', () => {
		expect(isNil({})).toBe(false)
	})
})

describe('safeJsonParse', () => {
	it('should parse valid JSON correctly', () => {
		const json = '{"name": "test", "value": 123}'
		const result = safeJsonParse(json, null)
		expect(result).toEqual({name: 'test', value: 123})
	})

	it('should return fallback for invalid JSON', () => {
		const invalidJson = '{invalid json}'
		const fallback = {default: true}
		const result = safeJsonParse(invalidJson, fallback)
		expect(result).toBe(fallback)
	})

	it('should handle null input', () => {
		const fallback = 'fallback'
		// @ts-expect-error Testing invalid input
		const result = safeJsonParse(null, fallback)
		expect(result).toBe(fallback)
	})

	it('should handle undefined input', () => {
		const fallback = 'fallback'
		// @ts-expect-error Testing invalid input
		const result = safeJsonParse(undefined, fallback)
		expect(result).toBe(fallback)
	})

	it('should parse arrays correctly', () => {
		const json = '[1, 2, 3]'
		const result = safeJsonParse(json, [])
		expect(result).toEqual([1, 2, 3])
	})

	it('should parse primitive values correctly', () => {
		expect(safeJsonParse('"string"', null)).toBe('string')
		expect(safeJsonParse('123', null)).toBe(123)
		expect(safeJsonParse('true', null)).toBe(true)
		expect(safeJsonParse('null', 'fallback')).toBe(null)
	})
})
