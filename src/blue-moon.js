/** @license
 *  ----------------------------------------------------------------------------
 *  Blue Moon Date API - <https://github.com/chrisjwaddell/blue-moon>
 *  Licensed under MIT
 *  Copyright Chris Waddell
 *  ----------------------------------------------------------------------------
 */

import {isObjectPlain, isObjectEmpty} from "./utils/01-object.js"

import {
	daysNameList,
	dayToNumber,
	dayToNumberThreeLetter,
} from "./utils/01-date-days"

import {
	DAY_MS,
	isYearValid,
	isLeapYear,
	daysInMonth,
	changeDay,
	changeMonth,
	changeYear,
	sameWeekCountDays,
} from "./utils/01-date-manipulation.js"

import {
	isNumber,
	isNumberSign,
	isNumberSigned,
	getNumbers,
} from "./utils/01-number.js"

import {dateToDay, dayOfTheWeek} from "./utils/01-date-daysName"

import {errorWarningString} from "./utils/05-debugging"

function BlueMoon(datesettings) {
	// ^INITIALIZE
	let settings = datesettings || {}
	settings.pivotDate = settings.pivotDate ?? {}
	settings.resultAsDateObject = settings.resultAsDateObject ?? false
	settings.startOfWeek = settings.startOfWeek ?? 1
	settings.warnings = settings.warnings ?? true

	let today = new Date()

	let pivd = settings.pivotDate
	if (isObjectEmpty(pivd)) {
		pivd = dateToObj(today)
	}

	const invalidDate = () => new Date("")

	// errorMsg: boolean, if true, red, else blue
	const showMsg = (msg, errorMsg) => {
		if ((settings.warnings && !errorMsg) || errorMsg) {
			console.log(
				`%c` + (errorMsg ? "ERROR" : "WARNING") + ` - ${msg}`,
				"color: " + (errorMsg ? "red" : "blue") + "; font-size: 16px"
			)
		}
	}
	// ^RELATIVE DATE SETTINGS

	// Pivot date
	// if it's blank, the default is today

	let result = {}

	let dsCheck = datePropertiesAndChecks(datesettings, true, settings)

	if (dsCheck.TypeErrors !== "") {
		showMsg(dsCheck.TypeErrors, true)
		return invalidDate()
	}

	if (dsCheck.errors !== "") {
		showMsg(dsCheck.errors, true)
		return invalidDate()
	}

	let pdCheck = datePropertiesAndChecks(pivd, false, settings)

	if (pdCheck.TypeErrors !== "") {
		showMsg(pdCheck.TypeErrors, true)
		return invalidDate()
	}

	if (pdCheck.errors !== "") {
		showMsg(pdCheck.errors, true)
		return invalidDate()
	}

	if (dsCheck.warnings !== "") {
		showMsg(dsCheck.warnings, false)
	}

	if (pdCheck.warnings !== "") {
		showMsg(pdCheck.warnings, false)
	}

	let pdtemp = dateDWMY(
		pdCheck.D,
		{},
		pdCheck.M,
		pdCheck.Y,
		dateToObj(today),
		{}
	)

	// If 'loop' is in settings, return an array of date objects
	if (Object.prototype.hasOwnProperty.call(settings, "loop")) {
		return loopResults()
	} else {
		let res = dateDWMY(
			dsCheck.D,
			dsCheck.W,
			dsCheck.M,
			dsCheck.Y,
			pdtemp,
			settings
		)

		return settings.resultAsDateObject ? objToDate(res) : res
	}

	// ^ Loop setting
	function loopResults() {
		let dType = dsCheck.D.type
		let incrementLoop = "d"

		let arrLoop = []

		switch (dType) {
			case "current":
				incrementLoop = "d"
				break
			case "relative":
				incrementLoop = "d"
				break

			case "dayofweek":
				if (datesettings.week) {
					incrementLoop = "y"
				} else {
					incrementLoop = "w"
				}
				break

			case "absolute":
				if (datesettings.month) {
					incrementLoop = "y"
				} else {
					incrementLoop = "m"
				}
				break
			case "dayofweek weeknum":
				if (datesettings.month) {
					incrementLoop = "y"
				} else {
					incrementLoop = "m"
				}
				break
			default:
				break
		}

		arrLoop.push(pdtemp)

		let newpivd = pdtemp
		for (let i = 0; i < Math.abs(settings.loop) - 1; i += 1) {
			switch (incrementLoop) {
				case "d":
					if (newpivd.day < 28 && settings.loop > 0) {
						newpivd = {
							day: newpivd.day + 1,
							month: newpivd.month,
							year: newpivd.year,
						}
					} else if (newpivd.day > 1 && settings.loop < 0) {
						newpivd = {
							day: newpivd.day - 1,
							month: newpivd.month,
							year: newpivd.year,
						}
					} else {
						settings.loop > 0
							? (newpivd = changeDay(newpivd, DAY_MS * 1))
							: (newpivd = changeDay(newpivd, DAY_MS * -1))
					}
					break
				case "w":
					settings.loop > 0
						? (newpivd = changeDay(newpivd, DAY_MS * 7))
						: (newpivd = changeDay(newpivd, DAY_MS * -7))
					break
				case "m":
					if (newpivd.month < 12 && settings.loop > 0) {
						newpivd = {
							day: newpivd.day,
							month: newpivd.month + 1,
							year: newpivd.year,
						}
					} else if (newpivd.month > 1 && settings.loop < 0) {
						newpivd = {
							day: newpivd.day,
							month: newpivd.month - 1,
							year: newpivd.year,
						}
					} else {
						settings.loop > 0
							? (newpivd = changeMonth(newpivd, 1, true))
							: (newpivd = changeMonth(newpivd, -1, true))
					}

					break
				case "y":
					settings.loop > 0
						? (newpivd = changeYear(newpivd, 1))
						: (newpivd = changeYear(newpivd, -1))
					break
				default:
					break
			}

			arrLoop.push(newpivd)
		}

		// let arrResult = arrLoop.map((cv) =>
		// 	dateDWMY(dsCheck.D, dsCheck.W, dsCheck.M, dsCheck.Y, cv, settings)
		// )

		let arrResult = []

		if (!settings.resultAsDateObject) {
			arrResult = arrLoop.map((cv) =>
				dateDWMY(
					dsCheck.D,
					dsCheck.W,
					dsCheck.M,
					dsCheck.Y,
					cv,
					settings
				)
			)
		} else {
			arrResult = arrLoop.map((cv) =>
				objToDate(
					dateDWMY(
						dsCheck.D,
						dsCheck.W,
						dsCheck.M,
						dsCheck.Y,
						cv,
						settings
					)
				)
			)
		}

		return arrResult
	}

	function valuetype(str, datetype) {
		let val = String(str).trim()

		if (isNumber(val)) {
			return {
				type: "absolute",
				offset: Number(val),
			}
		} else if (isNumberSigned(val)) {
			return {
				type: "relative",
				offset: val,
			}
		} else {
			if (val === "current") {
				return {
					type: "current",
					offset: val,
				}
			} else if (
				val === "monthend" &&
				(datetype === "d" || datetype === "pd-d")
			) {
				return {
					type: "absolute",
					offset: val,
				}
			} else if (datetype === "d") {
				let part1 = ""
				let part2 = ""
				let seperator = val.indexOf(" ")

				if (seperator === -1) {
					part1 = val
				} else {
					part1 = val.slice(0, seperator)
					part2 = val.slice(seperator + 1)
				}

				if (part1.length === 3) {
					let daynumber = dayToNumberThreeLetter(part1)
					if (daynumber !== -1) {
						if (seperator === -1) {
							return {
								type: "dayofweek",
								offset: daynumber,
							}
						} else {
							return {
								type: "dayofweek weeknum",
								offset: {
									0: daynumber,
									1: part2,
								},
							}
						}
					} else {
						return {
							type: "error",
							offset: part1,
						}
					}
				} else {
					let daynumber = dayToNumber(part1)
					if (daynumber !== -1) {
						if (seperator === -1) {
							return {
								type: "dayofweek",
								offset: daynumber,
							}
						} else {
							return {
								type: "dayofweek weeknum",
								offset: {
									0: daynumber,
									1: part2,
								},
							}
						}
					} else {
						return {
							type: "error",
							offset: part1,
						}
					}
				}
			} else {
				return {
					type: "error",
					offset: "error",
				}
			}
		}
	}

	// Drill into the options from day type as the root
	// eg day: 1, month: 1 - this is in dAbsOrCur
	function dateDWMY(d, w, m, y, pivotdate, settings) {
		// Day - absolute
		if (d.type === "absolute" || d.type === "current") {
			return dAbsOrCur()
		} else if (d.type === "relative") {
			result = changeDay(
				{
					year: pivotdate.year,
					month: pivotdate.month,
					day: pivotdate.day,
				},
				DAY_MS * Number(d.offset)
			)
			return result
		} else if (d.type === "dayofweek") {
			result = dDayOfWeek()
			return result
		} else if (d.type === "dayofweek weeknum") {
			result = dDayofweekWeeknum()
			return result
		}

		// Day absolute
		function dAbsOrCur() {
			let wmy =
				(w && !isObjectEmpty(w) ? "Y" : "N") +
				(m && !isObjectEmpty(m) ? "Y" : "N") +
				(y && !isObjectEmpty(y) ? "Y" : "N")

			let yy, mm

			let obj = {},
				next = {}

			switch (wmy) {
				case "NYY":
					if (m.type === "absolute" || m.type === "current") {
						mm = absOrCur(m, "m", pivotdate)
						if (y.type === "absolute" || y.type === "current") {
							yy = absOrCur(y, "y", pivotdate)
						} else if (y.type === "relative") {
							yy = pivotdate.year + Number(y.offset)
						}

						obj = {
							year: yy,
							month: mm,
							day: dOrMonthEnd(
								{
									type: "absolute",
									offset: absOrCur(d, "d", pivotdate),
								},
								mm,
								yy
							),
						}
						return obj
					} else {
						if (y.type === "absolute" || y.type === "current") {
							yy = absOrCur(y, "y", pivotdate)
							mm = pivotdate.month
							obj = {
								year: yy,
								month: mm,
								day: dOrMonthEnd(d, mm, yy),
							}

							if (m.type === "relative") {
								next = changeMonth(obj, Number(m.offset), false)
								return {
									year: next.year,
									month: next.month,
									day: dOrMonthEnd(
										{
											type: "absolute",
											offset: absOrCur(d, "d", pivotdate),
										},
										next.month,
										next.year
									),
								}
							} else {
								return {}
							}
						} else {
							if (m.type === "relative") {
								if (y.type === "relative") {
									yy = pivotdate.year + Number(y.offset)
									mm = pivotdate.month
									obj = {
										year: yy,
										month: mm,
										day: dOrMonthEnd(d, mm, yy),
									}
									next = changeMonth(
										obj,
										Number(m.offset),
										false
									)
									return {
										year: next.year,
										month: next.month,
										day: dOrMonthEnd(
											{
												type: "absolute",
												offset: absOrCur(
													d,
													"d",
													pivotdate
												),
											},
											next.month,
											next.year
										),
									}
								}
							}
						}
					}
					break
				case "NNY":
					if (y.type === "absolute" || y.type === "current") {
						yy = absOrCur(y, "y", pivotdate)
					} else if (y.type === "relative") {
						yy = pivotdate.year + Number(y.offset)
					}
					mm = pivotdate.month
					obj = {
						year: yy,
						month: mm,
						day: dOrMonthEnd(
							{
								type: "absolute",
								offset: absOrCur(d, "d", pivotdate),
							},
							mm,
							yy
						),
					}
					return obj

				case "NNN":
					yy = pivotdate.year
					mm = pivotdate.month

					obj = {
						year: pivotdate.year,
						month: pivotdate.month,
						day: dOrMonthEnd(
							{
								type: "absolute",
								offset: absOrCur(d, "d", pivotdate),
							},
							mm,
							yy
						),
					}
					return obj
				case "NYN":
					yy = pivotdate.year

					if (m.type === "absolute" || m.type === "current") {
						mm = absOrCur(m, "m", pivotdate)
						obj = {
							year: yy,
							month: absOrCur(m, "m", pivotdate),
							day: dOrMonthEnd(
								{
									type: "absolute",
									offset: absOrCur(d, "d", pivotdate),
								},
								mm,
								yy
							),
						}
						return obj
					} else if (m.type === "relative") {
						yy = pivotdate.year
						mm = pivotdate.month
						obj = {
							year: yy,
							month: mm,
							day: dOrMonthEnd(
								{
									type: "absolute",
									offset: absOrCur(d, "d", pivotdate),
								},
								mm,
								yy
							),
						}
						next = changeMonth(obj, Number(m.offset), false)
						return {
							year: next.year,
							month: next.month,
							day: dOrMonthEnd(
								{
									type: "absolute",
									offset: absOrCur(d, "d", pivotdate),
								},
								next.month,
								next.year
							),
						}
					}
					break
				default:
					break
			}
		}

		// Day dayofweek
		function dDayOfWeek() {
			let wmy =
				(w && !isObjectEmpty(w) ? "Y" : "N") +
				(m && !isObjectEmpty(m) ? "Y" : "N") +
				(y && !isObjectEmpty(y) ? "Y" : "N")

			// let yy, mm, dd
			let baseDate

			switch (wmy) {
				case "NNN":
					baseDate = pivotdate
					break

				case "NNY":
					if (y.type === "absolute") {
						baseDate = {
							year: Number(y.offset),
							month: pivotdate.month,
							day: pivotdate.day,
						}
					} else if (y.type === "current") {
						baseDate = pivotdate
					} else if (y.type === "relative") {
						baseDate = {
							year: pivotdate.year + Number(y.offset),
							month: pivotdate.month,
							day: pivotdate.day,
						}
					}

					break

				case "YNN":
					if (w.type === "absolute") {
						// number of the week for that year
						let relativeWeek = changeDay(
							{day: 1, month: 1, year: pivotdate.year},
							DAY_MS * Number(w.offset) * 7
						)
						baseDate = relativeWeek
					} else if (w.type === "current") {
						baseDate = pivotdate
					} else if (w.type === "relative") {
						let relativeWeek = changeDay(
							pivotdate,
							DAY_MS * Number(w.offset) * 7
						)
						baseDate = relativeWeek
					}
					break
				case "YNY":
					// number of the week for that year
					if (w.type === "absolute") {
						if (y.type === "absolute") {
							let relativeWeek = changeDay(
								{day: 1, month: 1, year: Number(y.offset)},
								DAY_MS * Number(w.offset) * 7
							)
							// ;({year: yy, month: mm, day: dd} = relativeWeek)
							baseDate = relativeWeek
						} else if (y.type === "current") {
							let relativeWeek = changeDay(
								{day: 1, month: 1, year: pivotdate.year},
								DAY_MS * Number(w.offset) * 7
							)
							baseDate = relativeWeek
						} else if (y.type === "relative") {
							baseDate = changeDay(
								{
									day: 1,
									month: 1,
									year: pivotdate.year + Number(y.offset),
								},
								DAY_MS * Number(w.offset) * 7
							)
						}
					} else if (w.type === "current") {
						if (y.type === "absolute") {
							baseDate = {
								day: pivotdate.day,
								month: pivotdate.month,
								year: Number(y.offset),
							}
						} else if (y.type === "current") {
							baseDate = pivotdate
						} else if (y.type === "relative") {
							baseDate = {
								day: pivotdate.day,
								month: pivotdate.month,
								year: pivotdate.year + Number(y.offset),
							}
						}
					} else if (w.type === "relative") {
						if (y.type === "absolute") {
							baseDate = changeDay(
								{
									day: pivotdate.day,
									month: pivotdate.month,
									year: Number(y.offset),
								},
								DAY_MS * Number(w.offset) * 7
							)
						} else if (y.type === "current") {
							baseDate = changeDay(
								pivotdate,
								DAY_MS * Number(w.offset) * 7
							)
						} else if (y.type === "relative") {
							baseDate = changeDay(
								{
									day: pivotdate.day,
									month: pivotdate.month,
									year: pivotdate.year + Number(y.offset),
								},
								DAY_MS * Number(w.offset) * 7
							)
						}
					}

					break
				default:
					break
			}

			let dayMove = sameWeekCountDays(
				dayOfTheWeek(baseDate.day, baseDate.month, baseDate.year),
				Number(d.offset),
				settings.startOfWeek
			)

			return changeDay(baseDate, DAY_MS * dayMove)
		}

		function dDayofweekWeeknum() {
			let wmy =
				(w && !isObjectEmpty(w) ? "Y" : "N") +
				(m && !isObjectEmpty(m) ? "Y" : "N") +
				(y && !isObjectEmpty(y) ? "Y" : "N")

			let yy, mm
			// let baseDate

			// let obj = {},
			// 	next = {}

			// let D, M, Y

			let fullWeek = d.offset[1].includes("*")

			switch (wmy) {
				case "NNN":
					return dayOccurrenceInMonth(
						d.offset[0],
						Number.parseInt(d.offset[1].replace("*", "")),
						pivotdate.month,
						pivotdate.year,
						fullWeek,
						settings.startOfWeek
					)

				case "NNY":
					if (y.type === "absolute") {
						yy = Number(y.offset)
					} else if (y.type === "current") {
						yy = pivotdate.year
					} else if (y.type === "relative") {
						yy = pivotdate.year + Number(y.offset)
					}

					return dayOccurrenceInMonth(
						d.offset[0],
						Number.parseInt(d.offset[1].replace("*", "")),
						pivotdate.month,
						yy,
						fullWeek,
						settings.startOfWeek
					)

				case "NYN":
					if (m.type === "absolute") {
						mm = Number(m.offset)
					} else if (m.type === "current") {
						mm = pivotdate.month
					} else if (m.type === "relative") {
						mm = pivotdate.month + Number(m.offset)
					}

					return dayOccurrenceInMonth(
						d.offset[0],
						Number.parseInt(d.offset[1].replace("*", "")),
						mm,
						pivotdate.year,
						fullWeek,
						settings.startOfWeek
					)

				case "NYY":
					if (y.type === "absolute") {
						yy = Number(y.offset)
					} else if (y.type === "current") {
						yy = pivotdate.year
					} else if (y.type === "relative") {
						yy = pivotdate.year + Number(y.offset)
					}

					if (m.type === "absolute") {
						mm = Number(m.offset)
					} else if (m.type === "current") {
						mm = pivotdate.month
					} else if (m.type === "relative") {
						mm = pivotdate.month + Number(m.offset)
					}

					return dayOccurrenceInMonth(
						d.offset[0],
						Number.parseInt(d.offset[1].replace("*", "")),
						mm,
						yy,
						fullWeek,
						settings.startOfWeek
					)

				default:
					break
			}
		}
	}

	function dOrMonthEnd(vt, m, y) {
		return vt.offset === "monthend" ? daysInMonth(m, y) : Number(vt.offset)
	}

	function absOrCur(vt, type, pivotdate) {
		switch (type) {
			case "d":
				return vt.type === "current" ? pivotdate.day : vt.offset
			case "m":
				return vt.type === "current"
					? pivotdate.month
					: Number(vt.offset)
			case "y":
				return vt.type === "current"
					? pivotdate.year
					: Number(vt.offset)
			default:
				break
		}
	}

	// ^ BLUE MOON DATE FUNCTIONS

	// convert a Blue Moon date object to a javascript Date
	// it returns in the local time it is run on
	function objToDate(obj) {
		return new Date(obj.year, obj.month - 1, obj.day, 0, 0, 0, 0)
	}

	function dateToObj(dt) {
		return {
			year: dt.getFullYear(),
			month: dt.getMonth() + 1,
			day: dt.getDate(),
		}
	}

	function sameWeekFromTo(cur, dest, startOfWeek = 1) {
		if (cur === dest) return 0

		if (
			(startOfWeek > cur && startOfWeek > dest) ||
			(cur > startOfWeek && dest > startOfWeek)
		)
			return dest - cur

		if (startOfWeek === cur) {
			if (startOfWeek > dest) {
				return 7 - dest - 1
			} else {
				return dest - cur
			}
		}

		if (startOfWeek === dest) {
			if (startOfWeek > cur) {
				return dest - cur - 7
			} else {
				return dest - cur
			}
		}

		if (startOfWeek > cur) {
			if (dest > startOfWeek) {
				return dest - cur - 7
			}
		}

		if (cur > startOfWeek) {
			if (startOfWeek > dest) {
				return 7 - (cur - dest)
			}
		}
	}

	// Weeks in a month that start off with the set startOfWeek eg Monday
	// destDayNumber is day number of the day you want
	// occurrenceOfDay occurrence of the day eg 0, 1 is first Sunday of the month
	// fullWeek: true means it starts counting day occurrences after the
	// start of week occurs in the month
	function dayOccurrenceInMonth(
		destDayNumber,
		occurrenceOfDay,
		month,
		year,
		fullWeek = false,
		startOfWeek = 1
	) {
		let dayFinal
		let moveDays = 0
		let firstOccurrence = 0

		if (occurrenceOfDay > 0) {
			let cur = dayOfTheWeek(1, month, year)

			moveDays = sameWeekFromTo(cur, destDayNumber, startOfWeek)
			firstOccurrence = 0

			if (fullWeek) {
				let startOfFirstFullWeek = sameWeekFromTo(
					cur,
					startOfWeek,
					startOfWeek
				)
				startOfFirstFullWeek =
					startOfFirstFullWeek === 0
						? 0
						: 7 + sameWeekFromTo(cur, startOfWeek, startOfWeek)

				firstOccurrence =
					startOfFirstFullWeek +
					sameWeekFromTo(startOfWeek, destDayNumber, startOfWeek)
			} else {
				firstOccurrence = moveDays < 0 ? moveDays + 7 : moveDays
			}

			dayFinal = firstOccurrence + 7 * (occurrenceOfDay - 1) + 1
		} else if (occurrenceOfDay < 0) {
			let lastDay = daysInMonth(month, year)

			moveDays = sameWeekCountDays(
				dayOfTheWeek(lastDay, month, year),
				destDayNumber,
				startOfWeek
			)
			firstOccurrence = moveDays > 0 ? moveDays - 7 : moveDays

			dayFinal =
				lastDay + firstOccurrence - (Math.abs(occurrenceOfDay) - 1) * 7
		}

		return dayFinal > daysInMonth(month, year)
			? invalidDate()
			: {day: dayFinal, month: month, year: year}
	}

	// Check the date object in either datesettings or pivotDate
	// Which are both arguments from the main BlueMoon function
	// return { warnings: "", errors: "", TypeErrors }
	function datePropertiesAndChecks(dateObject, ds) {
		const propertyList = [
			"day",
			"week",
			"month",
			"year",
			"pivotDate",
			"resultAsDateObject",
			"loop",
			"startOfWeek",
			"warnings",
		]
		let Dvt = {},
			Wvt = {},
			Mvt = {},
			Yvt = {}

		const result = {warnings: "", errors: "", TypeErrors: ""}

		// ^- General checks
		if (!isObjectPlain(dateObject)) {
			// immediately return result, don't do any more checks
			result.TypeErrors = errorWarningString(
				(!ds ? "Pivot date - " : "") +
					"Argument 1 is not an object. See documentation for information.",
				result.TypeErrors
			)

			return result
		}

		for (let prop of Object.keys(dateObject)) {
			if (!propertyList.includes(prop)) {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") +
						`${prop} is a property that must be one of these property names - ${propertyList.toString()}`,
					result.errors
				)
			}
		}

		// ^ DATE SETTING
		if (dateObject.day) {
			Dvt = valuetype(dateObject.day, "d")
			result["D"] = Dvt
			if (Dvt.type === "error") {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") + `'day' is invalid.`,
					result.errors
				)
			} else if (Dvt.type === "absolute") {
				if (Number(Dvt.offset) < 1 || Number(Dvt.offset) > 31) {
					result.errors = errorWarningString(
						(!ds ? "Pivot date - " : "") +
							"'day' is outside the range of less than 1 or greater than 31. You can't have 'day' outside of this range. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.",
						result.errors
					)
				} else if (Number(Dvt.offset) > 28) {
					// check D is not too high eg 29, use "end"
					result.warnings = errorWarningString(
						(!ds ? "Pivot date - " : "") +
							"'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.",
						result.warnings
					)
				}
			} else if (Dvt.type === "relative") {
				if (isNumberSigned(Dvt.offset)) {
					if (Number(Dvt.offset) > 365) {
						result.warnings = errorWarningString(
							(!ds ? "Pivot date - " : "") +
								"'day' is a high number. Why don't you use years and/or months instead.",
							result.warnings
						)
					}
				}
			}
		} else {
			result.errors = errorWarningString(
				(!ds ? "Pivot date - " : "") +
					"'day' property is empty. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.",
				result.errors
			)
		}

		if (dateObject.week) {
			Wvt = valuetype(dateObject.week, "w")
			result["W"] = Wvt
			if (Wvt.type === "error") {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") + `'week' is invalid.`,
					result.errors
				)
			} else if (Wvt.type === "absolute") {
				if (Number(Wvt.offset) < 1 || Number(Wvt.offset) > 53) {
					result.errors = errorWarningString(
						(!ds ? "Pivot date - " : "") +
							"'week' is less than 1 or greater than 53. You can't have 'week' outside of this range.",
						result.errors
					)
				}
			} else if (Wvt.type === "relative") {
				if (isNumberSigned(Wvt.offset)) {
					if (Number(Wvt.offset) > 53) {
						result.warnings = errorWarningString(
							(!ds ? "Pivot date - " : "") +
								"'week' is a high number. Why don't you use years and/or months instead.",
							result.warnings
						)
					}
				}
			}
		}

		if (dateObject.month) {
			Mvt = valuetype(dateObject.month, "m")
			result["M"] = Mvt
			if (Mvt.type === "error") {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") + `'month' is invalid.`,
					result.errors
				)
			} else if (Mvt.type === "absolute") {
				if (Number(Mvt.offset) < 1 || Number(Mvt.offset) > 12) {
					result.errors = errorWarningString(
						(!ds ? "Pivot date - " : "") +
							"'month' is less than 1 or greater than 12. You can't have 'month' outside of this range.",
						result.errors
					)
				}
			} else if (Mvt.type === "relative") {
				if (isNumberSigned(Mvt.offset)) {
					if (Number(Mvt.offset) > 48) {
						result.warnings = errorWarningString(
							(!ds ? "Pivot date - " : "") +
								"'month' is a high number. Why don't you use years and/or months instead.",
							result.warnings
						)
					}
				}
			}
		}

		if (dateObject.year) {
			Yvt = valuetype(dateObject.year, "y")
			result["Y"] = Yvt
			if (Yvt.type === "error") {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") +
						`'year' is invalid. 'year' isn't a number.`,
					result.errors
				)
			} else if (Yvt.type === "absolute") {
				if (!isYearValid(Yvt.offset, 1600, 2300)) {
					result.errors = errorWarningString(
						(!ds ? "Pivot date - " : "") +
							`'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`,
						result.errors
					)
				}
			} else if (Yvt.type === "relative") {
				if (isNumberSigned(Yvt.offset)) {
					if (Number(Yvt.offset) > 500) {
						result.warnings = errorWarningString(
							(!ds ? "Pivot date - " : "") +
								`'year' is a high number - ${Yvt.offset}. Are you sure this is correct?.`,
							result.warnings
						)
					}
				}
			}
		}

		// Combinations not allowed

		// absolute day and week
		if (
			(Dvt.type === "absolute" || Dvt.type === "current") &&
			!isObjectEmpty(Wvt)
		) {
			result.errors = errorWarningString(
				(!ds ? "Pivot date - " : "") +
					`Day number and week number can't go together.`,
				result.errors
			)
		}

		// if day is relative, no other properties can be entered
		if (Dvt.type === "relative") {
			if (
				!isObjectEmpty(Wvt) ||
				!isObjectEmpty(Mvt) ||
				!isObjectEmpty(Yvt)
			) {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") +
						`'day' is relative. You can't have any other date properties, no week, month or year properties.  Eg if it's tomorrow (day: -1), you can't set week, month or year.`,
					result.errors
				)
			}
		}

		// if day is relative, no other properties can be entered
		if (Dvt.type === "dayofweek") {
			if (!isObjectEmpty(Mvt)) {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") +
						`'day' is a day of the week. You can't have a month properties set. Eg { day: "Tuesday", month: 5 } doesn't make sense. You can have { day: "Tuesday 2", month: 5} which would return the 2nd Tuesday of May for the current year.`,
					result.errors
				)
			}
		}

		if (Dvt.type === "dayofweek weeknum") {
			if (!isObjectEmpty(Wvt)) {
				result.errors = errorWarningString(
					(!ds ? "Pivot date - " : "") +
						`'day' is a day of the week with an occurrence. You can't have a week properties set. Eg { day: "Tuesday 2", week: 5 } doesn't make sense. You can have { day: "Tuesday 2"} or { day: "Tuesday 2", month: 5}.`,
					result.errors
				)
			}
		}

		// week and month don't mix
		if (
			(Wvt.type === "absolute" || Wvt.type === "current") &&
			!isObjectEmpty(Mvt) &&
			Mvt.type !== "error"
		) {
			result.errors = errorWarningString(
				(!ds ? "Pivot date - " : "") +
					`Week of year with month can't go together.`,
				result.errors
			)
		}

		return result
	}
}

export default BlueMoon
