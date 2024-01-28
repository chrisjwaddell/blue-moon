import {dayToNumber, dayToNumberThreeLetter} from "../01-date-days"

test("dayToNumber 2 - Tuesday", () => {
	let res = dayToNumber("Tuesday")
	expect(res).toBe(2)
})

test("dayToNumber  0 - Sunday", () => {
	let res = dayToNumber("Sunday")
	expect(res).toBe(0)
})

test("dayToNumber 5 - Friday", () => {
	let res = dayToNumber("Friday")
	expect(res).toBe(5)
})

test("dayToNumberThreeLetter 2 - Tue", () => {
	let res = dayToNumberThreeLetter("Tue")
	expect(res).toBe(2)
})

test("dayToNumberThreeLetter 0 - Sun", () => {
	let res = dayToNumberThreeLetter("Sun")
	expect(res).toBe(0)
})

test("dayToNumberThreeLetter 5 - Fri", () => {
	let res = dayToNumberThreeLetter("Fri")
	expect(res).toBe(5)
})
