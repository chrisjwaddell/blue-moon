import {getCharacters} from "../01-string"

describe("getCharacters tests", () => {
	test("getCharacters('abc2314def')", () => {
		expect(getCharacters("abc2314def")).toBe("abcdef")
	})

	test("getCharacters('A man and 5 bikes')", () => {
		expect(getCharacters("A man and 5 bikes")).toBe("Amanandbikes")
	})
})
