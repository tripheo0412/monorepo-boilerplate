/* eslint-disable @typescript-eslint/no-explicit-any */
import {replaceNumberByInteger} from '../json-helper'

describe('json-helper', () => {
	describe('replaceNumberByInteger', () => {
		/**
		 * Test basic replacement of number type with enum
		 */
		it('should replace type "number" with "integer" when enum is present', () => {
			const input = {
				type: 'number',
				enum: [1, 2, 3],
			}

			replaceNumberByInteger(input)

			expect(input.type).toBe('integer')
			expect(input.enum).toEqual([1, 2, 3])
		})

		/**
		 * Test that it doesn't replace when enum is not present
		 */
		it('should not replace type "number" when enum is not present', () => {
			const input = {
				type: 'number',
			}

			replaceNumberByInteger(input)

			expect(input.type).toBe('number')
		})

		/**
		 * Test that it doesn't replace when enum is not an array
		 */
		it('should not replace type "number" when enum is not an array', () => {
			const input: any = {
				type: 'number',
				enum: 'not-an-array',
			}

			replaceNumberByInteger(input)

			expect(input.type).toBe('number')
		})

		/**
		 * Test that it doesn't replace when type is not "number"
		 */
		it('should not replace when type is not "number"', () => {
			const input = {
				type: 'string',
				enum: ['a', 'b', 'c'],
			}

			replaceNumberByInteger(input)

			expect(input.type).toBe('string')
		})

		/**
		 * Test nested object replacement
		 */
		it('should recursively replace in nested objects', () => {
			const input = {
				properties: {
					status: {
						type: 'number',
						enum: [0, 1, 2],
					},
					count: {
						type: 'number',
					},
					data: {
						nested: {
							type: 'number',
							enum: [10, 20],
						},
					},
				},
			}

			replaceNumberByInteger(input)

			expect(input.properties.status.type).toBe('integer')
			expect(input.properties.count.type).toBe('number')
			expect(input.properties.data.nested.type).toBe('integer')
		})

		/**
		 * Test with null input
		 */
		it('should handle null input', () => {
			const input: any = null

			replaceNumberByInteger(input)

			expect(input).toBeNull()
		})

		/**
		 * Test with undefined input
		 */
		it('should handle undefined input', () => {
			const input: any = undefined

			replaceNumberByInteger(input)

			expect(input).toBeUndefined()
		})

		/**
		 * Test with array input
		 */
		it('should not process arrays', () => {
			const input = [
				{type: 'number', enum: [1, 2]},
				{type: 'number', enum: [3, 4]},
			]

			replaceNumberByInteger(input)

			// Arrays should not be processed, so types remain unchanged
			expect(input[0].type).toBe('number')
			expect(input[1].type).toBe('number')
		})

		/**
		 * Test with Date object
		 */
		it('should not process Date objects', () => {
			const input = new Date()

			replaceNumberByInteger(input)

			expect(input).toBeInstanceOf(Date)
		})

		/**
		 * Test with primitive values
		 */
		it('should handle primitive values', () => {
			replaceNumberByInteger('string')
			replaceNumberByInteger(123)
			replaceNumberByInteger(true)

			// Should not throw errors
			expect(true).toBe(true)
		})

		/**
		 * Test deeply nested structures
		 */
		it('should handle deeply nested structures', () => {
			const input = {
				level1: {
					level2: {
						level3: {
							type: 'number',
							enum: [1, 2, 3],
						},
					},
				},
			}

			replaceNumberByInteger(input)

			expect(input.level1.level2.level3.type).toBe('integer')
		})

		/**
		 * Test circular references
		 */
		it('should handle objects with circular references', () => {
			const input: any = {
				type: 'number',
				enum: [1, 2],
			}
			input.circular = input

			// This should not cause infinite recursion
			replaceNumberByInteger(input)

			expect(input.type).toBe('integer')
		})

		/**
		 * Test empty object
		 */
		it('should handle empty objects', () => {
			const input = {}

			replaceNumberByInteger(input)

			expect(input).toEqual({})
		})

		/**
		 * Test object with empty enum array
		 */
		it('should replace type when enum is empty array', () => {
			const input: any = {
				type: 'number',
				enum: [],
			}

			replaceNumberByInteger(input)

			expect(input.type).toBe('integer')
		})

		/**
		 * Test object with various property types
		 */
		it('should only process plain objects', () => {
			const func = (): void => {}
			const input = {
				func: func,
				regex: /test/,
				symbol: Symbol('test'),
				plainObject: {
					type: 'number',
					enum: [1, 2],
				},
			}

			replaceNumberByInteger(input)

			expect(input.plainObject.type).toBe('integer')
			expect(input.func).toBe(func)
			expect(input.regex).toEqual(/test/)
		})
	})
})
