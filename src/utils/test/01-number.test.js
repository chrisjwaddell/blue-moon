import {isNumber, isNumberSigned, isNumberSign, getNumbers} from "../01-number"

describe("isNumber tests", () => {
	test("isNumber('abc')", () => {
		let result = isNumber("abc")
		expect(result).toBe(false)
	})

	test("isNumber('abc')", () => {
		let result = isNumber()
		expect(result).toBe(false)
	})

	test("isNumber('abc')", () => {
		let result = isNumber()
		expect(result).toBe(false)
	})

	test("isNumber('abc')", () => {
		let result = isNumber()
		expect(result).toBe(false)
	})

	test("isNumber('abc')", () => {
		let result = isNumber()
		expect(result).toBe(false)
	})

	test("isNumber('abc')", () => {
		let result = isNumber()
		expect(result).toBe(false)
	})
})

describe("isNumberSIgned tests", () => {
	test("isNumberSigned('1')", () => {
		let result = isNumberSigned("1")
		expect(result).toBe(false)
	})

	test("isNumberSigned('+1')", () => {
		let result = isNumberSigned("+1")
		expect(result).toBe(true)
	})

	test("isNumberSigned('-40')", () => {
		let result = isNumberSigned("-40")
		expect(result).toBe(true)
	})
})

describe("isNumberSign tests", () => {
	test("isNumberSign('1')", () => {
		let result = isNumberSign("1")
		expect(result).toBe(true)
	})

	test("isNumberSign('+1')", () => {
		let result = isNumberSign("+1")
		expect(result).toBe(true)
	})

	test("isNumberSign('-40')", () => {
		let result = isNumberSign("-40")
		expect(result).toBe(true)
	})
})

describe("getNumbers tests", () => {
	test("getNumbers('safdasdf')", () => {
		let result = getNumbers("safdasdf")
		expect(result).toBe("")
	})

	test("getNumbers('453a34534')", () => {
		let result = getNumbers("453a34534")
		expect(result).toBe("45334534")
	})

	test("getNumbers('44545')", () => {
		let result = getNumbers("44545")
		expect(result).toBe("44545")
	})

	test("getNumbers('44545')", () => {
		let result = getNumbers("44545")
		expect(result).toBe("44545")
	})
})
