import {
	DAY_MS,
	isYearValid,
	isLeapYear,
	daysInYear,
	daysInMonth,
	changeDay,
	changeMonth,
	changeYear,
	sameWeekCountDays,
} from "../01-date-manipulation"

describe("isYearValid", () => {
	test("isYearValid 100 is false", () => {
		let result = isYearValid(100, 2000, 2100)
		expect(result).toBe(false)
	})
	test("isYearValid 100 but within 2 years - false", () => {
		let result = isYearValid(100, 0, 3000)
		expect(result).toBe(false)
	})
	test("isYearValid 1100 between 1000 and 3000 true", () => {
		let result = isYearValid(1100, 1000, 3000)
		expect(result).toBe(true)
	})
	test("isYearValid 2000 but below lower limit", () => {
		let result = isYearValid(2000, 2100, 2500)
		expect(result).toBe(false)
	})
	test("isYearValid 2100 but above upper limit", () => {
		let result = isYearValid(2100, 2000, 2050)
		expect(result).toBe(false)
	})

	test("isYearValid 2000 within range", () => {
		let result = isYearValid(2000, 2000, 2100)
		expect(result).toBe(true)
	})
	test("isYearValid 2010 within range", () => {
		let result = isYearValid(2010, 2000, 2100)
		expect(result).toBe(true)
	})
	test("isYearValid 2050 within range", () => {
		let result = isYearValid(2050, 2000, 2050)
		expect(result).toBe(true)
	})
})

describe("isYearValid 100 is false", () => {
	test("daysInMonth Jan", () => {
		let result = daysInMonth(1, 2024)
		expect(result).toBe(31)
	})
	test("daysInMonth Feb", () => {
		let result = daysInMonth(2, 2024)
		expect(result).toBe(29)
	})
	test("daysInMonth Mar", () => {
		let result = daysInMonth(3, 2024)
		expect(result).toBe(31)
	})
	test("daysInMonth Apr", () => {
		let result = daysInMonth(4, 2024)
		expect(result).toBe(30)
	})
	test("daysInMonth May", () => {
		let result = daysInMonth(5, 2024)
		expect(result).toBe(31)
	})
	test("daysInMonth Jun", () => {
		let result = daysInMonth(6, 2024)
		expect(result).toBe(30)
	})
	test("daysInMonth Jul", () => {
		let result = daysInMonth(7, 2024)
		expect(result).toBe(31)
	})
	test("daysInMonth Aug", () => {
		let result = daysInMonth(8, 2024)
		expect(result).toBe(31)
	})
	test("daysInMonth Sep", () => {
		let result = daysInMonth(9, 2024)
		expect(result).toBe(30)
	})
	test("daysInMonth Oct", () => {
		let result = daysInMonth(10, 2024)
		expect(result).toBe(31)
	})
	test("daysInMonth Nov", () => {
		let result = daysInMonth(11, 2024)
		expect(result).toBe(30)
	})
	test("daysInMonth Dec", () => {
		let result = daysInMonth(12, 2024)
		expect(result).toBe(31)
	})

	test("daysInMonth Feb - non leap year", () => {
		let result = daysInMonth(2, 2025)
		expect(result).toBe(28)
	})
	test("daysInMonth Feb - non leap year", () => {
		let result = daysInMonth(2, 2026)
		expect(result).toBe(28)
	})
	test("daysInMonth Feb - non leap year", () => {
		let result = daysInMonth(2, 2027)
		expect(result).toBe(28)
	})
	test("daysInMonth Feb - leap year", () => {
		let result = daysInMonth(2, 2028)
		expect(result).toBe(29)
	})
	test("daysInMonth Feb - non leap year", () => {
		let result = daysInMonth(2, 2029)
		expect(result).toBe(28)
	})
	test("daysInMonth Feb - non leap year", () => {
		let result = daysInMonth(2, 2030)
		expect(result).toBe(28)
	})
	test("daysInMonth Feb - non leap year", () => {
		let result = daysInMonth(2, 2031)
		expect(result).toBe(28)
	})

	test("daysInMonth Feb - leap year", () => {
		let result = daysInMonth(2, 1996)
		expect(result).toBe(29)
	})
})

const notLeapYears = [1999, 2531, 943, 1762, 3678, 1000]
const leapYears = [2000, 2004, 2024, 964]

describe("daysInYear - non leap year", () => {
	notLeapYears.forEach((year) => {
		test(`daysInYear - ${year} `, () => {
			let result = daysInYear(year)
			expect(result).toBe(365)
		})
	})
})

describe("daysInYear - Leap year", () => {
	leapYears.forEach((year) => {
		test(`daysInYear - ${year} `, () => {
			let result = daysInYear(year)
			expect(result).toBe(366)
		})
	})
})

describe("changeDay", () => {
	test("changeDay({day: 1, month: 5, year: 2000}, DAY_MS * 5)", () => {
		let result = changeDay({day: 1, month: 5, year: 2000}, 5 * DAY_MS)
		expect(result).toEqual({day: 6, month: 5, year: 2000})
	})

	test("changeDay({day: 20, month: 5, year: 2000}, DAY_MS * 5)", () => {
		let result = changeDay({day: 20, month: 5, year: 2000}, 5 * DAY_MS)
		expect(result).toEqual({day: 25, month: 5, year: 2000})
	})

	test("changeDay({day: 20, month: 5, year: 2000}, DAY_MS * 31)", () => {
		let result = changeDay({day: 20, month: 5, year: 2000}, 31 * DAY_MS)
		expect(result).toEqual({day: 20, month: 6, year: 2000})
	})
})

describe("changeMonth", () => {
	test("changeMonth({day: 1, month: 5, year: 2000}, 5, true) - {day: 1, month: 10, year: 2000}", () => {
		let result = changeMonth({day: 1, month: 5, year: 2000}, 5, true)
		expect(result).toEqual({day: 1, month: 10, year: 2000})
	})

	test("changeMonth({day: 1, month: 5, year: 2000}, 15, true) - {day: 1, month: 8, year: 2001}", () => {
		let result = changeMonth({day: 1, month: 5, year: 2000}, 15, true)
		expect(result).toEqual({day: 1, month: 8, year: 2001})
	})

	test("changeMonth({day: 31, month: 5, year: 2000}, 1, true) - {day: 1, month: 7, year: 2000}", () => {
		let result = changeMonth({day: 31, month: 5, year: 2000}, 1, true)
		expect(result).toEqual({day: 1, month: 7, year: 2000})
	})
})

describe("changeYear", () => {
	test("changeYear({day: 31, month: 5, year: 2000}, 5) - {day: 31, month: 5, year: 2005}", () => {
		let result = changeYear({day: 31, month: 5, year: 2000}, 5)
		expect(result).toEqual({day: 31, month: 5, year: 2005})
	})

	test("changeYear({day: 29, month: 2, year: 2000}, 1) - {}", () => {
		let result = changeYear({day: 29, month: 2, year: 2000}, 1)
		expect(result).toEqual({day: 1, month: 3, year: 2001})
	})
})

describe("sameWeekCountDays - Mon is start of week", () => {
	test("sameWeekCountDays(1, 0, 1) - Mon to Sun - Mon is start of week", () => {
		let result = sameWeekCountDays(1, 0, 1)
		expect(result).toBe(6)
	})

	test("sameWeekCountDays(2, 0, 1) - Tue to Sun - Mon is start of week", () => {
		let result = sameWeekCountDays(2, 0, 1)
		expect(result).toBe(5)
	})

	test("sameWeekCountDays(6, 0, 1) - Sat to Sun - Mon is start of week", () => {
		let result = sameWeekCountDays(6, 0, 1)
		expect(result).toBe(1)
	})

	test("sameWeekCountDays(7, 0, 1) - Mon to Sun - Mon is start of week", () => {
		let result = sameWeekCountDays(7, 0, 1)
		expect(result).toBe(0)
	})

	test("sameWeekCountDays(2, 0, 1) - Sun to Wed - Mon is start of week", () => {
		let result = sameWeekCountDays(0, 3, 1)
		expect(result).toBe(-4)
	})
})

describe("sameWeekCountDays - Thu is start of week", () => {
	test("sameWeekCountDays(1, 0, 4) - Mon to Sun - Thu is start of week", () => {
		let result = sameWeekCountDays(1, 0, 4)
		expect(result).toBe(-1)
	})

	test("sameWeekCountDays(2, 0, 4) - Tue to Sun - Thu is start of week", () => {
		let result = sameWeekCountDays(2, 0, 4)
		expect(result).toBe(-2)
	})

	test("sameWeekCountDays(4, 5, 4) - Thu to Fri - Thu is start of week", () => {
		let result = sameWeekCountDays(4, 5, 4)
		expect(result).toBe(1)
	})

	test("sameWeekCountDays(4, 0, 4) - Thu to Sun - Thu is start of week", () => {
		let result = sameWeekCountDays(4, 0, 4)
		expect(result).toBe(3)
	})
})

describe("sameWeekCountDays - Sat is start of week", () => {
	test("sameWeekCountDays(4, 0, 6) - Thu to Sun - Sat is start of week", () => {
		let result = sameWeekCountDays(4, 0, 6)
		expect(result).toBe(-4)
	})
})
