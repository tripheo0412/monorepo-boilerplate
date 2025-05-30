/* eslint-disable @typescript-eslint/no-explicit-any */
function isPlainObject(value: any): boolean {
	return (
		typeof value === 'object' &&
		value !== null &&
		!Array.isArray(value) &&
		!(value instanceof Date)
	)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function replaceNumberByInteger(input: any): void {
	if (
		isPlainObject(input) &&
		input['type'] === 'number' &&
		Array.isArray(input['enum'])
	) {
		input['type'] = 'integer'
		return
	}

	if (isPlainObject(input)) {
		for (const key in input) {
			replaceNumberByInteger(input[key])
		}
	}
}
