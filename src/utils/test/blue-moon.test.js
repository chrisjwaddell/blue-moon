import BlueMoon from "../../blue-moon"
import {changeDay, changeMonth, DAY_MS} from "../01-date-manipulation"

let today = new Date()

let currentDate = today.getDate()
let currentMonth = today.getMonth() + 1
let currentYear = today.getFullYear()

describe("Day of week", () => {
	test("", () => {
		expect(BlueMoon({day: "Mon", week: 1, year: 2023})).toEqual({
			day: 2,
			month: 1,
			year: 2023,
		})
	})
	test("", () => {
		expect(BlueMoon({day: "Mon", week: 32, year: 2023})).toEqual({
			day: 7,
			month: 8,
			year: 2023,
		})
	})

	// Too hard to do tests
	// test("", () => {
	// 	expect(BlueMoon({day: "Mon", week: "+2", year: 2023})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })
	// test("", () => {
	// 	expect(BlueMoon({day: "Mon", week: "current", year: 2023})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })
	// test("", () => {
	// 	expect(BlueMoon({day: "Mon", year: 2023})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })
})

describe("Day of week", () => {
	test("", () => {
		expect(BlueMoon({day: 1, month: 1, year: 2023})).toEqual({
			day: 1,
			month: 1,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 5, year: 2023})).toEqual({
			day: 1,
			month: 5,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "current", year: 2023})).toEqual({
			day: 1,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "+2", year: 2023})).toEqual(
			changeMonth(
				{
					day: 1,
					month: currentMonth,
					year: 2023,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 1, year: 2023})).toEqual({
			day: 1,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 1, year: 2030})).toEqual({
			day: 1,
			month: 1,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 5, year: 2030})).toEqual({
			day: 1,
			month: 5,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "current", year: 2030})).toEqual({
			day: 1,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "+2", year: 2030})).toEqual(
			changeMonth(
				{
					day: 1,
					month: currentMonth,
					year: 2030,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 1, year: 2030})).toEqual({
			day: 1,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 1, year: 2010})).toEqual({
			day: 1,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 5, year: 2010})).toEqual({
			day: 1,
			month: 5,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "current", year: 2010})).toEqual({
			day: 1,
			month: currentMonth,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "+2", year: 2010})).toEqual(
			changeMonth(
				{
					day: 1,
					month: currentMonth,
					year: 2010,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 1, year: 2010})).toEqual({
			day: 1,
			month: currentMonth,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 1, year: "current"})).toEqual({
			day: 1,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 5, year: "current"})).toEqual({
			day: 1,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "current", year: "current"})).toEqual({
			day: 1,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "+2", year: "current"})).toEqual(
			changeMonth(
				{
					day: 1,
					month: currentMonth,
					year: currentYear,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 1, year: "current"})).toEqual({
			day: 1,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 1, year: "+2"})).toEqual({
			day: 1,
			month: 1,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 5, year: "+2"})).toEqual({
			day: 1,
			month: 5,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "current", year: "+2"})).toEqual({
			day: 1,
			month: currentMonth,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "+2", year: "+2"})).toEqual(
			changeMonth(
				{
					day: 1,
					month: currentMonth,
					year: currentYear + 2,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 1, year: "+2"})).toEqual({
			day: 1,
			month: currentMonth,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 1})).toEqual({
			day: 1,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: 5})).toEqual({
			day: 1,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "current"})).toEqual({
			day: 1,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 1, month: "+2"})).toEqual(
			changeMonth(
				{
					day: 1,
					month: currentMonth,
					year: currentYear,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 1})).toEqual({
			day: 1,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 1, year: 2023})).toEqual({
			day: 5,
			month: 1,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 5, year: 2023})).toEqual({
			day: 5,
			month: 5,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "current", year: 2023})).toEqual({
			day: 5,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "+2", year: 2023})).toEqual(
			changeMonth(
				{
					day: 5,
					month: currentMonth,
					year: 2023,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 5, year: 2023})).toEqual({
			day: 5,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 1, year: 2030})).toEqual({
			day: 5,
			month: 1,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 5, year: 2030})).toEqual({
			day: 5,
			month: 5,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "current", year: 2030})).toEqual({
			day: 5,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "+2", year: 2030})).toEqual(
			changeMonth(
				{
					day: 5,
					month: currentMonth,
					year: 2030,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 5, year: 2030})).toEqual({
			day: 5,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 1, year: 2010})).toEqual({
			day: 5,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 5, year: 2010})).toEqual({
			day: 5,
			month: 5,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "current", year: 2010})).toEqual({
			day: 5,
			month: currentMonth,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "+2", year: 2010})).toEqual(
			changeMonth(
				{
					day: 5,
					month: currentMonth,
					year: 2010,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 5, year: 2010})).toEqual({
			day: 5,
			month: currentMonth,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 1, year: "current"})).toEqual({
			day: 5,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 5, year: "current"})).toEqual({
			day: 5,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "current", year: "current"})).toEqual({
			day: 5,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "+2", year: "current"})).toEqual(
			changeMonth(
				{
					day: 5,
					month: currentMonth,
					year: currentYear,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 5, year: "current"})).toEqual({
			day: 5,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 1, year: "+2"})).toEqual({
			day: 5,
			month: 1,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 5, year: "+2"})).toEqual({
			day: 5,
			month: 5,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "current", year: "+2"})).toEqual({
			day: 5,
			month: currentMonth,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "+2", year: "+2"})).toEqual(
			changeMonth(
				{
					day: 5,
					month: currentMonth,
					year: currentYear + 2,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 5, year: "+2"})).toEqual({
			day: 5,
			month: currentMonth,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 1})).toEqual({
			day: 5,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: 5})).toEqual({
			day: 5,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "current"})).toEqual({
			day: 5,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 5, month: "+2"})).toEqual(
			changeMonth(
				{
					day: 5,
					month: currentMonth,
					year: currentYear,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 5})).toEqual({
			day: 5,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 1, year: 2023})).toEqual({
			day: 30,
			month: 1,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 5, year: 2023})).toEqual({
			day: 30,
			month: 5,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: "current", year: 2023})).toEqual({
			day: 30,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: "+2", year: 2023})).toEqual(
			changeMonth(
				{
					day: 30,
					month: currentMonth,
					year: 2023,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 30, year: 2023})).toEqual({
			day: 30,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 1, year: 2030})).toEqual({
			day: 30,
			month: 1,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 5, year: 2030})).toEqual({
			day: 30,
			month: 5,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: "current", year: 2030})).toEqual({
			day: 30,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: "+2", year: 2030})).toEqual(
			changeMonth(
				{
					day: 30,
					month: currentMonth,
					year: 2030,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: 30, year: 2030})).toEqual({
			day: 30,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 1, year: 2010})).toEqual({
			day: 30,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 5, year: 2010})).toEqual({
			day: 30,
			month: 5,
			year: 2010,
		})
	})

	// test("", () => {
	// 	expect(BlueMoon({day: 30, month: "current", year: 2010})).toEqual({
	// 		day: 30,
	// 		month: currentMonth,
	// 		year: 2010,
	// 	})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: 30, month: "+2", year: 2010})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: 30, year: 2010})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	test("", () => {
		expect(BlueMoon({day: 30, month: 1, year: "current"})).toEqual({
			day: 30,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 5, year: "current"})).toEqual({
			day: 30,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: "current", year: "current"})).toEqual({
			day: 30,
			month: currentMonth,
			year: currentYear,
		})
	})

	// test("", () => {
	// 	expect(BlueMoon({day: 30, month: "+2", year: "current"})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: 30, year: "current"})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	test("", () => {
		expect(BlueMoon({day: 30, month: 1, year: "+2"})).toEqual({
			day: 30,
			month: 1,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 5, year: "+2"})).toEqual({
			day: 30,
			month: 5,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: "current", year: "+2"})).toEqual({
			day: 30,
			month: currentMonth,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: "+2", year: "+2"})).toEqual(
			changeMonth(
				{
					day: 30,
					month: currentMonth,
					year: currentYear + 2,
				},
				2
			)
		)
	})

	// test("", () => {
	// 	expect(BlueMoon({day: 30, year: +2})).toEqual({
	// 		day: 30,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	test("", () => {
		expect(BlueMoon({day: 30, month: 1})).toEqual({
			day: 30,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: 30, month: 5})).toEqual({
			day: 30,
			month: 5,
			year: currentYear,
		})
	})

	// test("", () => {
	// 	expect(BlueMoon({day: 30, month: "current"})).toEqual({
	// 		day: 30,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: 30, month: "+2"})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: 30})).toEqual({
	// 		day: 2,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })
})

// *******************************************************************************

describe("day: current", () => {
	test("", () => {
		expect(BlueMoon({day: "current", month: 1, year: 2023})).toEqual({
			day: currentDate,
			month: 1,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 5, year: 2023})).toEqual({
			day: currentDate,
			month: 5,
			year: 2023,
		})
	})

	test("", () => {
		expect(
			BlueMoon({day: "current", month: "current", year: 2023})
		).toEqual({
			day: currentDate,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: "+2", year: 2023})).toEqual(
			changeMonth(
				{
					day: currentDate,
					month: currentMonth,
					year: 2023,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: "current", year: 2023})).toEqual({
			day: currentDate,
			month: currentMonth,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 1, year: 2030})).toEqual({
			day: currentDate,
			month: 1,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 5, year: 2030})).toEqual({
			day: currentDate,
			month: 5,
			year: 2030,
		})
	})

	test("", () => {
		expect(
			BlueMoon({day: "current", month: "current", year: 2030})
		).toEqual({
			day: currentDate,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: "+2", year: 2030})).toEqual(
			changeMonth(
				{
					day: currentDate,
					month: currentMonth,
					year: 2030,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: "current", year: 2030})).toEqual({
			day: currentDate,
			month: currentMonth,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 1, year: 2010})).toEqual({
			day: currentDate,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 5, year: 2010})).toEqual({
			day: currentDate,
			month: 5,
			year: 2010,
		})
	})

	test("", () => {
		expect(
			BlueMoon({day: "current", month: "current", year: 2010})
		).toEqual({
			day: currentDate,
			month: currentMonth,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: "+2", year: 2010})).toEqual(
			changeMonth(
				{
					day: currentDate,
					month: currentMonth,
					year: 2010,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: "current", year: 2010})).toEqual({
			day: currentDate,
			month: currentMonth,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 1, year: "current"})).toEqual({
			day: currentDate,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 5, year: "current"})).toEqual({
			day: currentDate,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(
			BlueMoon({day: "current", month: "current", year: "current"})
		).toEqual({
			day: currentDate,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(
			BlueMoon({day: "current", month: "+2", year: "current"})
		).toEqual(
			changeMonth(
				{
					day: currentDate,
					month: currentMonth,
					year: currentYear,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: "current", year: "current"})).toEqual({
			day: currentDate,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 1, year: "+2"})).toEqual({
			day: currentDate,
			month: 1,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 5, year: "+2"})).toEqual({
			day: currentDate,
			month: 5,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(
			BlueMoon({day: "current", month: "current", year: "+2"})
		).toEqual({
			day: currentDate,
			month: currentMonth,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: "+2", year: "+2"})).toEqual(
			changeMonth(
				{
					day: currentDate,
					month: currentMonth,
					year: currentYear + 2,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: "current", year: "+2"})).toEqual({
			day: currentDate,
			month: currentMonth,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 1})).toEqual({
			day: currentDate,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: 5})).toEqual({
			day: currentDate,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: "current"})).toEqual({
			day: currentDate,
			month: currentMonth,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "current", month: "+2"})).toEqual(
			changeMonth(
				{
					day: currentDate,
					month: currentMonth,
					year: currentYear,
				},
				2
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: "current"})).toEqual({
			day: currentDate,
			month: currentMonth,
			year: currentYear,
		})
	})
})

describe("currentday + 5 can only have 'day' property, no 'week', 'month' or 'year' properties", () => {
	test("", () => {
		expect(BlueMoon({day: "+5"})).toEqual(
			changeDay(
				{
					day: currentDate,
					month: currentMonth,
					year: currentYear,
				},
				DAY_MS * 5
			)
		)
	})

	test("", () => {
		expect(BlueMoon({day: "+5", week: 5}).valueOf()).toBeNaN()
	})

	test("", () => {
		expect(BlueMoon({day: "+5", month: 5}).valueOf()).toBeNaN()
	})

	test("", () => {
		expect(BlueMoon({day: "+5", year: 2020}).valueOf()).toBeNaN()
	})

	test("", () => {
		expect(BlueMoon({day: "+5", week: 5, month: 5}).valueOf()).toBeNaN()
	})

	test("", () => {
		expect(
			BlueMoon({day: "+5", week: 5, month: 5, year: 2020}).valueOf()
		).toBeNaN()
	})

	test("", () => {
		expect(BlueMoon({day: "+5", month: 5, year: 2020}).valueOf()).toBeNaN()
	})

	test("", () => {
		expect(BlueMoon({day: "+5", week: 5, year: 2020}).valueOf()).toBeNaN()
	})
})

describe("day: monthend", () => {
	test("", () => {
		expect(BlueMoon({day: "monthend", month: 1, year: 2023})).toEqual({
			day: 31,
			month: 1,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 5, year: 2023})).toEqual({
			day: 31,
			month: 5,
			year: 2023,
		})
	})

	// test("", () => {
	// 	expect(
	// 		BlueMoon({day: "monthend", month: "current", year: 2023})
	// 	).toEqual({day: 31, month: 1, year: 2023})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: "monthend", month: "+2", year: 2023})).toEqual({
	// 		day: 31,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: "monthend", year: 2023})).toEqual({
	// 		day: 31,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	// test("", () => {
	// 	expect(BlueMoon({day: "monthend", month: 1, year: 2030})).toEqual({
	// 		day: 31,
	// 		month: 1,
	// 		year: 2023,
	// 	})
	// })

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 1, year: 2010})).toEqual({
			day: 31,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 5, year: 2010})).toEqual({
			day: 31,
			month: 5,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 1, year: "current"})).toEqual({
			day: 31,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 5, year: "current"})).toEqual({
			day: 31,
			month: 5,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 1, year: "+2"})).toEqual({
			day: 31,
			month: 1,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 5, year: "+2"})).toEqual({
			day: 31,
			month: 5,
			year: currentYear + 2,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 1})).toEqual({
			day: 31,
			month: 1,
			year: currentYear,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "monthend", month: 5})).toEqual({
			day: 31,
			month: 5,
			year: currentYear,
		})
	})
})

describe("day: Sunday 3", () => {
	test("", () => {
		expect(BlueMoon({day: "Sunday 3", month: 1, year: 2023})).toEqual({
			day: 15,
			month: 1,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Sunday 3", month: 5, year: 2023})).toEqual({
			day: 21,
			month: 5,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Sunday 3", month: 1, year: 2030})).toEqual({
			day: 20,
			month: 1,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Sunday 3", month: 5, year: 2030})).toEqual({
			day: 19,
			month: 5,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Sunday 3", month: 1, year: 2010})).toEqual({
			day: 17,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Sunday 3", month: 5, year: 2010})).toEqual({
			day: 16,
			month: 5,
			year: 2010,
		})
	})
})

describe("day: 'Wednesday -2'", () => {
	test("", () => {
		expect(BlueMoon({day: "Wednesday -2", month: 1, year: 2023})).toEqual({
			day: 18,
			month: 1,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Wednesday -2", month: 5, year: 2023})).toEqual({
			day: 24,
			month: 5,
			year: 2023,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Wednesday -2", month: 1, year: 2030})).toEqual({
			day: 23,
			month: 1,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Wednesday -2", month: 5, year: 2030})).toEqual({
			day: 22,
			month: 5,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Wednesday -2", month: 1, year: 2010})).toEqual({
			day: 20,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Wednesday -2", month: 5, year: 2010})).toEqual({
			day: 19,
			month: 5,
			year: 2010,
		})
	})
})

describe("day: 'Thursday *1'", () => {
	test("", () => {
		expect(BlueMoon({day: "Thursday *1", month: 1, year: 2023})).toEqual({
			day: 5,
			month: 1,
			year: 2023,
		})
	})
	test("", () => {
		expect(BlueMoon({day: "Thursday *1", month: 5, year: 2023})).toEqual({
			day: 4,
			month: 5,
			year: 2023,
		})
	})
	test("", () => {
		expect(BlueMoon({day: "Thursday *1", month: 1, year: 2030})).toEqual({
			day: 10,
			month: 1,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Thursday *1", month: 5, year: 2030})).toEqual({
			day: 9,
			month: 5,
			year: 2030,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Thursday *1", month: 1, year: 2010})).toEqual({
			day: 7,
			month: 1,
			year: 2010,
		})
	})

	test("", () => {
		expect(BlueMoon({day: "Thursday *1", month: 5, year: 2010})).toEqual({
			day: 6,
			month: 5,
			year: 2010,
		})
	})
})
