const DAY_MS = 86400000;

// Accepts 4 digit years.
// Min and max values optional
function isYearValid(year, minyear, maxyear) {
    let text = /^\d{4}$/;
    let y = Number(year)

    if (y != 0) {
        if ((y != "") && (!text.test(y))) {
            return false;
        }

        if (String(y).length != 4) return false;

        if ((minyear) && (maxyear)) {
            if ((y < minyear) || (y > maxyear)) {
                console.log(`Year should be in range ${minyear} to ${maxyear}`);
                return false;
            }
        }

        return true;
    } else {
        return false
    }
}

// console.log(isYearValid(2022, 1900, 3000)) // true
// console.log(isYearValid(0022, 1900, 3000)) // false
// console.log(isYearValid(2922, 1900, 3000)) // true
// console.log(isYearValid(2922, 1900, 2300)) // false, Year should be in range 1900 to 2300



function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
  function that takes month number and its year and returns the number of days within it
  * @param monthnumber.
  * @param year.
*/
function daysInMonthOld(monthnumber, year) {
    if (monthnumber === 4 || monthnumber === 6 || monthnumber === 9 || monthnumber === 11) {
        return 30
    } else if (monthnumber !== 2) {
        return 31
    }
    return (isLeap(year)) ? 29 : 28
}

function daysInMonth(month, year) {
    const days = [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31,
        30, 31, 31, 30, 31, 30, 31
    ]
    return days[month - 1]
}

function daysInYear(year) {
    return 365 + (isLeapYear(year) ? 1 : 0)
}


// changeDay uses UTC to set and get the day, month and year so that no
// timezone rules can change the time. UTC is a time standard.
// In dateobj, month 1 is January
// 12 midday is used just to be on the safe side
function changeDay(dateobj, ms) {
    let dt = new Date(Date.UTC(dateobj.year, dateobj.month - 1, dateobj.day, 12, 0, 0, 0))
    let dt2 = new Date(dt.valueOf() + ms)

    return {
        year: dt2.getUTCFullYear(),
        month: dt2.getUTCMonth() + 1,
        day: dt2.getUTCDate()
    }
}

// Australian time AEST time zone, 2/10/2022 at 2am,
// it changed to 3am, daylight savings
// Using GMT just messes things up
// console.log(changeDay({
//     year: 2022,
//     month: 10,
//     day: 5
// }, DAY_MS * -3))
// console.log(changeDay({
//     year: 2022,
//     month: 10,
//     day: 2
// }, DAY_MS * -3))


// Given a date object eg {year: 2022, month: 12, day: 1 },
// and a number of months, adds the 'months' argument to the date
// If you increase the month +1 and day is over 28 and the next month
// doesn't have that day, it returns {} as an error
// You can add or minus months, eg +5, =5
// In dateobj, month 1 is January
function changeMonth(dateobj, months) {
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
            day: Number(dateobj.day)
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
            day: Number(dateobj.day)
        }
    }

    let maxDays = daysInMonth(Number(result.month), Number(result.year))

    if (Number(dateobj.day) <= maxDays) {
        return result
    } else {
        return {}
    }
}



// console.log(changeMonth({
//     year: 2022,
//     month: 1,
//     day: 1
// }, 2))

// console.log(changeMonth({
//     year: 2022,
//     month: 1,
//     day: 29
// }, 1))
// console.log(changeMonth({
//     year: 2024,
//     month: 1,
//     day: 29
// }, 1))
// console.log(changeMonth({
//     year: 2022,
//     month: 5,
//     day: 30
// }, 1))
// console.log(changeMonth({
//     year: 2022,
//     month: 5,
//     day: 31
// }, 1))




function nextDayName(daynumberfrom, daynumberto, forward = true) {
    if (forward) {
        if (daynumberfrom > daynumberto) {
            return 7 - (daynumberfrom - daynumberto)
        } else {
            return daynumberto - daynumberfrom
        }
    } else {
        if (daynumberfrom > daynumberto) {
            return daynumberfrom - daynumberto
        } else {
            return 7 - (daynumberfrom - daynumberto)
        }
    }
}


function sameWeekCountDays(daynumberfrom, daynumberto, startofweek = 1) {
    if (daynumberfrom === daynumberto) {
        return 0
    } else if ((daynumberfrom >= startofweek) && (daynumberto >= startofweek)) {
        // eg start of week - Mon ,   Mon -> Fri = 4 days
        return daynumberto - daynumberfrom
    } else {
        let df = (daynumberfrom < startofweek) ? daynumberfrom + 7 : daynumberfrom
        let dt = (daynumberto < startofweek) ? daynumberto + 7 : daynumberto

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
    nextDayName,
    sameWeekCountDays
}
