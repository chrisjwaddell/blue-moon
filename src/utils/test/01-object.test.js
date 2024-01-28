import {isObjectPlain, isObjectEmpty} from "../01-object"

describe("isObjectPlain tests", () => {
	test("{a: 1 } - true", () => {
		expect(isObjectPlain({a: 1})).toBe(true)
	})

	test("null ", () => {
		expect(isObjectPlain(null)).toBe(false)
	})

	test("undefined", () => {
		expect(isObjectPlain(undefined)).toBe(false)
	})

	test("[1, 2, 3] - false", () => {
		expect(isObjectPlain([1, 2, 3])).toBe(false)
	})

	test("{} - true", () => {
		expect(isObjectPlain({})).toBe(true)
	})
})

describe("isObjectEmpty tests", () => {
	test("{a: 1 } - true", () => {
		expect(isObjectEmpty({a: 1})).toBe(false)
	})

	test("null ", () => {
		expect(isObjectEmpty(null)).toBe(false)
	})

	test("undefined", () => {
		expect(isObjectEmpty(undefined)).toBe(false)
	})

	test("[1, 2, 3] - false", () => {
		expect(isObjectEmpty([1, 2, 3])).toBe(false)
	})

	test("{} - true", () => {
		expect(isObjectEmpty({})).toBe(true)
	})
})
