const DAY_MS = 86_400_000

// Accepts 4 digit years.
// Min and max values optional
function isYearValid(year, minyear, maxyear) {
	let text = /^\d{4}$/
	let y = Number(year)

	if (y !== 0) {
		if (y !== "" && !text.test(y)) {
			return false
		}

		if (String(y).length !== 4) return false

		if (minyear && maxyear) {
			if (y < minyear || y > maxyear) {
				return false
			}
		}

		return true
	} else {
		return false
	}
}

// if the year is divisible by 100 and not divisible by 400, leap year is skipped
// Years 1700, 1800, and 1900 were not leap years. 2100 will not be a leap year
function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
  function that takes month number and its year and returns the number of days within it
  * @param monthnumber.
  * @param year.
*/
function daysInMonth(month, year) {
	const days = [
		31,
		28 + (isLeapYear(year) ? 1 : 0),
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	]
	return days[month - 1]
}

function daysInYear(year) {
	return 365 + (isLeapYear(year) ? 1 : 0)
}

// changeDay takes date from your local timezone and converts to UTC
// Given a date object eg {year: 2022, month: 12, day: 1 },
// In dateobj, month 1 is January
// ms is a number of milliseconds to change the date object by

// It increases (or decreases) days from UTC so that timezone rule
// changes don't affect it.
// Since timezone rules adjust usually by 1/2 hr, 1 hr, or 2 hrs usually
// changeDay granularity is to the day so this will not be affected
// by hour adjustments
// The default time is 12 midday used just to be on the safe side
// UTC is a time standard.
function changeDay(dateobj, ms) {
	let d
	if (Object.prototype.toString.call(dateobj) !== "[object Object]") {
		d = {
			day: dateobj.getDate(),
			month: dateobj.getMonth() + 1,
			year: dateobj.getFullYear(),
		}
	} else {
		d = dateobj
	}

	let dt = new Date(Date.UTC(d.year, d.month - 1, d.day, 12, 0, 0, 0))
	let dt2 = new Date(dt.valueOf() + ms)

	return {
		year: dt2.getUTCFullYear(),
		month: dt2.getUTCMonth() + 1,
		day: dt2.getUTCDate(),
	}
}

// Australian time AEST time zone, 2/10/2022 at 2am,
// it changed to 3am, daylight savings
// Using GMT just messes things up

// Given a date object eg {year: 2022, month: 12, day: 1 },
// and a number of months, adds the 'months' argument to the date
// If you increase the month +1 and day is over 28 and the next month
// doesn't have that day, it returns {} as an error
// You can add or minus months, eg +5, =5
// In dateobj, month 1 is January
function changeMonth(dateobj, months, checkForMaxDays = false) {
	let y = Math.floor(Math.abs(months) / 12)
	let remainder = Math.abs(months % 12)
	let m

	let result = {}

	if (months >= 0) {
		if (Number(dateobj.month) + remainder > 12) {
			y += 1
			m = Number(dateobj.month) + remainder - 12
		} else {
			m = Number(dateobj.month) + remainder
		}

		result = {
			year: Number(dateobj.year) + y,
			month: m,
			day: Number(dateobj.day),
		}
	} else {
		if (Number(dateobj.month) - remainder > 0) {
			m = Number(dateobj.month) - remainder
		} else {
			y += 1
			m = 12 + Number(dateobj.month) - remainder
		}

		result = {
			year: Number(dateobj.year) - y,
			month: m,
			day: Number(dateobj.day),
		}
	}

	if (checkForMaxDays) {
		let maxDays = daysInMonth(Number(result.month), Number(result.year))

		if (Number(dateobj.day) <= maxDays) {
			return result
		} else {
			result.day = Number(dateobj.day) - maxDays
			result.month += 1
			return result
		}
	} else {
		return result
	}
}

function changeYear(dateobj, years) {
	if (dateobj.day > 28 && dateobj.month === 2) {
		let currentYearLeepYear = isLeapYear(dateobj.year)
		if (currentYearLeepYear !== isLeapYear(dateobj.year + years)) {
			return {day: 1, month: 3, year: dateobj.year + years}
		}
	}
	return {
		day: dateobj.day,
		month: dateobj.month,
		year: dateobj.year + years,
	}
}

// moving forward or back a few days
function sameWeekCountDays(daynumberfrom, daynumberto, startofweek = 1) {
	if (daynumberfrom === daynumberto) {
		return 0
	} else if (daynumberfrom >= startofweek && daynumberto >= startofweek) {
		// eg start of week - Mon ,   Mon -> Fri = 4 days
		return daynumberto - daynumberfrom
	} else {
		let df = daynumberfrom < startofweek ? daynumberfrom + 7 : daynumberfrom
		let dt = daynumberto < startofweek ? daynumberto + 7 : daynumberto

		return dt - df
	}
}

export {
	DAY_MS,
	isYearValid,
	isLeapYear,
	daysInYear,
	daysInMonth,
	changeDay,
	changeMonth,
	changeYear,
	sameWeekCountDays,
}
