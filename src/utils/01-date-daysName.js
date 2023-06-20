const dateToDay = (dateobj) => {
	const {year, month, day} = dateobj

	if (day < 0 || day > 31 || month > 12 || month < 1) {
		return new TypeError("Date is not valid.")
	}

	// JS months start at 0
	return dayOfTheWeek(Number(day), Number(month), Number(year))
}

// Find dayname for a Date
// Sunday - 0 .... Saturday 6
// Uses Zeller congruence
// https://www.geeksforgeeks.org/zellers-congruence-find-day-date/
// https: //github.com/TheAlgorithms/JavaScript/blob/master/Conversions/DateToDay.js
function dayOfTheWeek(day, month, year) {
	// In case of Jan and Feb:
	// Year: we consider it as previous year
	// e.g., 1/1/1987 here year is 1986 (-1)
	// Month: we consider value as 13 & 14 respectively
	if (month < 3) {
		year--
		month += 12
	}

	// divide year into century and the last two digits of the century
	const yearDigits = year % 100
	const century = Math.floor(year / 100)

	/*
    In mathematics, remainders of divisions are usually defined to always be positive;
    As an example, -2 mod 7 = 5.
    Many programming languages including JavaScript implement the remainder of `n % m` as `sign(n) * (abs(n) % m)`.
    This means the result has the same sign as the numerator. Here, `-2 % 7 = -1 * (2 % 7) = -2`.
    To ensure a positive numerator, the formula is adapted: `- 2 * century` is replaced with `+ 5 * century`
    which does not alter the resulting numbers mod 7 since `7 - 2 = 5`
    The following example shows the issue with modulo division:
    Without the adaption, the formula yields `weekDay = -6` for the date 2/3/2014;
    With the adaption, it yields the positive result `weekDay = 7 - 6 = 1` (Sunday), which is what we need to index the array
    */
	const weekDay =
		(day +
			Math.floor((month + 1) * 2.6) +
			yearDigits +
			Math.floor(yearDigits / 4) +
			Math.floor(century / 4) +
			5 * century) %
		7

	return weekDay === 0 ? 6 : weekDay - 1
}

export {dateToDay, dayOfTheWeek}
