const DAY_MS = 86400000
let today = new Date()



const dateToDay = (dateobj) => {
    if (typeof dateobj !== 'object') {
        return new TypeError('Argument is not an object.')
    }

    const {
        year,
        month,
        day
    } = dateobj

    if (day < 0 || day > 31 || month > 12 || month < 0) {
        return new TypeError('Date is not valid.')
    }

    // JS months start at 0
    return dayOfTheWeek(day, month - 1, year)
}

function dayOfTheWeek(day, month, year) {
    const DAY_1970_01_01 = 4
    let days = day - 1
    while (month >= 1) {
        days += daysInMonth(month, year)
        month -= 1
    }

    while (year - 1 >= 1970) {
        days += daysInYear(year - 1)
        year -= 1
    }
    return (days + DAY_1970_01_01) % 7
}



function yearoffset(valuetype) {
    if (Yvt.type === "absolute") {
        Y = Number(Yvt.offset)
    } else if (Yvt.type === "current") {
        Y = today.getFullYear()
    } else if (Yvt.type === "relative") {
        Y = today.getFullYear() + Number(Yvt.offset)
    } else {
        Y = today.getFullYear()
    }
}



// function dateToDay(dateobj) {
//     if (typeof dateobj !== 'object') {
//         return new TypeError('Argument is not an object.')
//     }

//     const {
//         year,
//         month,
//         day
//     } = dateobj

//     if (day < 0 || day > 31 || month > 12 || month < 0) {
//         return new TypeError('Date is not valid.')
//     }

//     let dt = new Date(Date.UTC(dateobj.year, dateobj.month - 1, dateobj.day, 12, 0, 0, 0))

//     return dt.getDay()
// }

function dayToNumber(dayname) {
    return daysNameList.findIndex(day => day.toLowerCase() === dayname.toLowerCase());
}

function dayToNumberTwoLetter(daynametwoletter) {
    return daysNameList.findIndex(day => day.slice(0, 2).toLowerCase() === daynametwoletter.toLowerCase());
}


function testfn() {
    console.log("TESTING AREA ***********************")



    console.log(typeof relativeDate({
        day: 1,
        month: 1,
        year: 1
    }))

    // relativeDate("D4M4", new Date(2023, 6, 6, 0, 0, 0, 0))

    // relativeDate("D1M+5Y+1")
    // debugger

    // relativeDate("D1M+5Y+1", {
    //     y: 2019,
    //     m: 1,
    //     d: 17
    // })


    // let newDate = relativeDate({}, {
    //     y: 2019,
    //     m: 1,
    //     d: 17
    // })


    // console.log("HERE ***********************   date4 <---- Works ")
    // let date4 = relativeDate({
    //     day: " 4"
    // }, {
    //     year: 2022,
    //     month: 10,
    //     day: 1
    // })

    // console.log(date4)
    // if (date4.error) console.log("ERROR - " + date4.error)


    console.log("HERE ***********************   date0126")

    // let date0126 = relativeDate({
    //     day: " 6",
    //     month: " + 12"
    // }, {
    //     year: 2023,
    //     month: 1,
    //     day: 1
    // })

    // console.log(date0126)

    // debugger
    // let date16p2 = relativeDate({
    //     day: "16",
    //     year: " + 2"
    // }, {
    //     year: 2023,
    //     month: 1,
    //     day: 1
    // })

    // console.log(date16p2)


    // relativeDate("D1M+5Y+1", {
    //     y: 2022,
    //     d: 29
    // })



    // let test1 = changeDay({
    //     year: 2022,
    //     month: 10,
    //     day: 1
    // }, 29 * 86400000)
    // console.log(test1)
    // console.log(new Date(test1.year, test1.month, test1.day, 0, 0, 0, 0))

    // let test2 = changeDay({
    //     year: 2022,
    //     month: 10,
    //     day: 1
    // }, 30 * 86400000)
    // console.log(new Date(test2.year, test2.month, test2.day, 0, 0, 0, 0))


    console.log("HERE ***********************")
}


testfn()

// console.log(nextDayName({
//     year: 2022,
//     month: 9,
//     day: 30
// }, "Sunday"))

console.log("*************************************************")

function yearoffset(valuetype) {
    if (valuetype.type === "absolute") {
        if (!isYearValid(valuetype.offset, 1600, 2300)) {
            return `Year ${valuetype.offset} is invalid`
        } else {
            return Number(valuetype.offset)
        }
    } else if (valuetype.type === "current") {
        return today.getFullYear()
    } else if (valuetype.type === "relative") {
        return today.getFullYear() + Number(valuetype.offset)
    } else {
        return today.getFullYear()
    }
}

debugger
// Y = yearoffset({
//     type: "absolute",
//     offset: "222"
// })

// if (!isNumber(Y)) {
//     result["error"] = errorstring(Y, result.error)
//     // return result
// }


console.log("*************************************************")

function reldatetest(relativedateobject, pivotdate, startofweek = 1) {
    let pd = {
        pdy: 2022,
        pdm: 10,
        pdd: 1
    }

    console.log(relativedateobject)

    // debugger

    let result = {}
    result.warning = ""
    result.error = ""
    let Dvt = Wvt = Mvt = Yvt = Ovt = {}
    let D, W, M, Y, O

    let firstOfMonth


    // a quick parse
    if (relativedateobject.day) {
        Dvt = valuetype(relativedateobject.day)
    } else {
        result["error"] = errorstring("'day' property is empty. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.", result.error)
        return result
    }

    if (relativedateobject.week) {
        Wvt = valuetype(relativedateobject.week)
    }
    if (relativedateobject.month) {
        Mvt = valuetype(relativedateobject.month)
    }

    if (relativedateobject.year) {
        Yvt = valuetype(relativedateobject.year)
    }


    // debugger

    if (relativedateobject.day) {
        // let Dvt = valuetype(relativedateobject.day)

        D = Number(Dvt.offset)

        if (Dvt.type === "absolute") {
            // check D is not too high eg 29, use "end"
            if (D > 28) {
                result["warning"] = "'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month."
                if (D > 31) {
                    result["error"] = "'day' is higher than 31. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month."
                    return result
                }
            }


            if (relativedateobject.week) {
                result["error"] = "'day' is an absolute number. You can't have any setting for 'week'. You can optionally have settings for 'month' and 'year', they must be absolute ie a specific number, but not for 'week'."
                return result
            }

            // if (Mvt.type === "relative" || Yvt.type === "relative") {
            //     result["error"] = "'day' is an absolute number. 'month' or 'year' is relative. You can optionally have settings for 'month' and 'year', they must be absolute ie a specific number."
            //     return result
            // }

            // if (Yvt.type === "absolute") {
            //     Y = Number(Yvt.offset)
            // } else if (Yvt.type === "current") {
            //     Y = today.getFullYear()
            // } else if (Yvt.type === "relative") {
            //     Y = today.getFullYear() + Number(Yvt.offset)
            // } else {
            //     Y = today.getFullYear()
            // }

            debugger
            Y = yearoffset(Yvt)
            if (!isNumber(Y)) {
                result["error"] = errorstring(Y, result.error)
                return result
            }



            if (Mvt.type === "absolute") {
                M = Number(Mvt.offset)
            } else if (Mvt.type === "current") {
                M = today.getMonth() + 1
            } else if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: (Dvt.offset === "monthend") ? 1 : D
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = (D === "monthend") ? daysInMonth(M, Y) : D

                if (!Y) {
                    result["error"] = errorstring("You can't change the month to this month, probably because the number is something like 31 when you are changing to a month that has 30 days in it. You can use days: 'monthend'.", result.error)
                    return result
                }

                return {
                    year: Y,
                    month: M,
                    day: D
                }
            } else {
                return {
                    year: Y,
                    month: today.getMonth() + 1,
                    // day: D
                    day: (Dvt.offset === "monthend") ? daysInMonth(today.getMonth() + 1, Y) : D
                }
            }

            if (Dvt.offset === "monthend") {
                D = daysInMonth(M, Y)
            }

            return {
                year: (Y) ? Y : today.getFullYear(),
                month: (M) ? M : today.getMonth() + 1,
                day: (D) ? D : today.getDate()
            }



        } else if (Dvt.type === "relative") {
            // D = (Dvt.offset === "current") ? today.getDate() : Number(Dvt.offset)

            // if (Wvt.type === "relative" || Mvt.type === "relative" || Yvt.type === "relative") {
            if (!isObjectEmpty(Wvt) || !isObjectEmpty(Mvt) || !isObjectEmpty(Yvt)) {
                result["error"] = errorstring("'day' is relative. You can't have 'week', 'month' or 'year' settings. Eg if it's tomorrow (day: -1), you can't set week, month or year.", result.error)
                return result
            }


            return changeDay({
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            }, DAY_MS * Number(Dvt.offset))



        } else if (Dvt.type === "current") {

            // if (relativedateobject.week) {
            //     result["error"] = "'day' is 'current'. You can't have any setting for 'week'. You can optionally have settings for 'month' and 'year', they must be absolute ie a specific number, but not for 'week'."
            //     return result
            // }

            // if (Yvt.type === "absolute") {
            //     Y = Number(Yvt.offset)
            // } else if (Yvt.type === "current") {
            //     Y = today.getFullYear()
            // } else if (Yvt.type === "relative") {
            //     Y = today.getFullYear() + Number(Yvt.offset)
            // } else {
            //     Y = today.getFullYear()
            // }

            Y = yearoffset(Yvt)
            if (!isNumber(Y)) {
                result["error"] = errorstring(Y, result.error)
                return result
            }

            if (Mvt.type === "absolute") {
                M = Number(Mvt.offset)
            } else if (Mvt.type === "current") {
                M = today.getMonth() + 1
            } else if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = dd

                if (!Y) {
                    result["error"] = errorstring("You can't change the month to this month, probably because the number is something like 31 when you are changing to a month that has 30 days in it. You can use days: 'monthend'.", result.error)
                    return result
                }

                return {
                    year: Y,
                    month: M,
                    day: D
                }
            } else {
                return {
                    year: Y,
                    month: today.getMonth() + 1,
                    day: today.getDate()
                }
            }

            return {
                year: Y,
                month: M,
                day: today.getDate()
            }


        } else if (Dvt.type === "dayofweek") {

            // if (Yvt.type === "absolute") {
            //     Y = Number(Yvt.offset)
            // } else if (Yvt.type === "current") {
            //     Y = today.getFullYear()
            // } else if (Yvt.type === "relative") {
            //     Y = today.getFullYear() + Number(Yvt.offset)
            // } else {
            //     Y = today.getFullYear()
            // }

            Y = yearoffset(Yvt)
            if (!isNumber(Y)) {
                result["error"] = errorstring(Y, result.error)
                return result
            }

            if (Mvt.type === "absolute") {
                M = Number(Mvt.offset)
            } else if (Mvt.type === "current") {
                M = today.getMonth() + 1
            } else if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = dd
            } else {
                M = today.getMonth() + 1
            }


            firstOfMonth = {
                year: Y,
                month: M,
                day: 1
            }

            let monthcurrent = {
                year: Y,
                month: M,
                day: today.getDate()
            }


            // day of week with Week number, it's next node is Month
            // { day: "Monday", week: 2 } means every month, Monday
            // of the 2nd week of each month

            if (Wvt.type === "absolute") {
                W = Number(Wvt.offset)

                let diff = sameWeekCountDays(dateToDay(firstOfMonth), Dvt.offset, startofweek) + ((Number(Wvt.offset) - 1) * 7)

                return changeDay(firstOfMonth, diff * DAY_MS)

            } else if ((Wvt.type === "current") || (!Wvt.type)) {

                let diff = sameWeekCountDays(dateToDay(monthcurrent), Dvt.offset, startofweek)

                return changeDay(monthcurrent, diff * DAY_MS)

            } else if (Wvt.type === "relative") {
                let diff = sameWeekCountDays(dateToDay(monthcurrent), Dvt.offset, startofweek) + ((Number(Wvt.offset)) * 7)

                return changeDay(monthcurrent, diff * DAY_MS)
            }


        } else if (Dvt.type === "dayofweek weeknum") {

            if (!isObjectEmpty(Wvt)) {
                result["error"] = errorstring("'day' is a dayname with a number eg 'Sunday 2', but it means 2nd Sunday of each month, it can't have a 'week' setting.", result.error)
                return result
            }

            // if (Yvt.type === "absolute") {
            //     Y = Number(Yvt.offset)
            // } else if (Yvt.type === "current") {
            //     Y = today.getFullYear()
            // } else if (Yvt.type === "relative") {
            //     Y = today.getFullYear() + Number(Yvt.offset)
            // } else {
            //     Y = today.getFullYear()
            // }

            Y = yearoffset(Yvt)
            if (!isNumber(Y)) {
                result["error"] = errorstring(Y, result.error)
                return result
            }


            if (Mvt.type === "absolute") {
                M = Number(Mvt.offset)
            } else if (Mvt.type === "current") {
                M = today.getMonth() + 1
            } else if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = dd
            } else {
                M = today.getMonth() + 1
            }

            firstOfMonth = {
                year: Y,
                month: M,
                day: 1
            }
            let lastOfMonth = {
                year: Y,
                month: M,
                day: daysInMonth(M, Y)
            }

            if (Dvt.offset[1][0] === "*") {
                if (Number(Dvt.offset[1].slice(1)) > 0) {
                    return weekFullFirst(firstOfMonth, Number(Dvt.offset[0]), Number(Dvt.offset[1].slice(1)), startofweek)
                } else {
                    return weekFullLast(lastOfMonth, Number(Dvt.offset[0]), Math.abs(Number(Dvt.offset[1].slice(1))), startofweek)
                }
            } else {
                if (Number(Dvt.offset[1]) > 0) {
                    return weekFirst(firstOfMonth, Number(Dvt.offset[0]), Number(Dvt.offset[1]), startofweek)
                } else {
                    return weekLast(lastOfMonth, Number(Dvt.offset[0]), Math.abs(Number(Dvt.offset[1])), startofweek)
                }
            }


        } else {
            // nothing entered, return current day
            result.value = {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            }
            result.error = errorstring("'day' property has no value. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.", result.error)
            return result
        }
    }


    // --------------------------------------

    // Basic stuff is done

    // Errors

    if (Dvt.type === "absolute") {
        // if (Wvt.type === "absolute" || Wvt.type === "relative") {
        if (relativedateobject.week) {
            result.error = errorstring("'week' property is in when you have 'day' in. You can't specify a specific day of the month and then specify a week.", result.error)
        }
    }


    if (Dvt.type === "relative") {
        if ((!relativedateobject.week) || (!relativedateobject.month) || (!relativedateobject.year)) {
            // result.error = errorstring("'day' property is relative. You can't specify a week, month or year when you are specifying a relative day eg yesterday ('day: -1') or 90 day from now ('day: +90')", result.error)
        }
    }



    // --------------------------------------

    // Description
    if (Dvt.type === "absolute" || Dvt.type === "current") {
        // if (Wvt.type === "absolute" || Wvt.type === "relative") {
        if (!relativedateobject.week) {

        }
    }



    // --------------------------------------

    if (result.error) {
        console.error(result.error)
    }


    function valuetype(str) {
        let val = String(str).trim()

        if (isNumberSign(val)) {
            if (isNumber(val)) {
                return {
                    type: "absolute",
                    offset: val
                }
            } else {
                return {
                    type: "relative",
                    offset: val
                }
            }
        } else {
            if (val === "current") {
                return {
                    type: "current",
                    offset: val
                }
            } else if (val === "monthend") {
                return {
                    type: "absolute",
                    offset: val
                }
            } else {

                let part1 = ""
                let part2 = ""
                let seperator = val.indexOf(" ")

                if (seperator === -1) {
                    part1 = val
                } else {
                    part1 = val.slice(0, seperator)
                    part2 = val.slice(seperator + 1)
                }

                if (part1.length === 2) {
                    let daynumber = dayToNumberTwoLetter(part1)
                    if (daynumber !== -1) {
                        if (seperator === -1) {
                            return {
                                type: "dayofweek",
                                offset: daynumber
                            }
                        } else {
                            return {
                                type: "dayofweek weeknum",
                                offset: {
                                    0: daynumber,
                                    1: part2
                                }
                            }

                        }
                    }
                } else {
                    let daynumber = dayToNumber(part1)
                    if (daynumber !== -1) {

                        if (seperator === -1) {
                            return {
                                type: "dayofweek",
                                offset: daynumber
                            }
                        } else {
                            return {
                                type: "dayofweek weeknum",
                                offset: {
                                    0: daynumber,
                                    1: part2
                                }
                            }
                        }

                    } else {
                        return {
                            type: "error",
                            offset: part1
                        }
                    }
                }

            }
        }
    }

    function errorstring(msg, errorstring) {
        return (errorstring) ? errorstring + "\n" + msg : msg
    }

    function warningstring(msg, warningstring) {
        return (warningstring) ? warningstring + "\n" + msg : msg
    }


    // Is this date past?


}


// console.log(reldatetest({
//     day: '+11',
//     month: "+1"
// }))

// console.log(reldatetest({
//     day: '11',
//     month: "5"
// }))

// console.log(reldatetest({
//     day: '-1'
// }))


// console.log(reldatetest({
//     day: 'current',
//     month: "+7"
// }))

// console.log(reldatetest({
//     day: 'we',
//     month: "+7"
// }))


// debugger

// console.log(reldatetest({
//     day: "fr",
//     week: "current"
// }))

console.log(reldatetest({
    day: "-4",
}))

// console.log(reldatetest({
//     day: +4,
// }))

console.log(reldatetest({
    day: "-3",
}))
console.log("*************************************************")


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


// debugger
console.log(changeDay({
    year: 2022,
    month: 10,
    day: 5
}, DAY_MS * -3))
console.log(changeDay({
    year: 2022,
    month: 10,
    day: 2
}, DAY_MS * -3))



function daysInMonth(month, year) {
    const days = [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31,
        30, 31, 31, 30, 31, 30, 31
    ]
    return days[month - 1]
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function daysInYear(year) {
    return 365 + (isLeapYear(year) ? 1 : 0)
}




// Given a date object eg {year: 2022, month: 12, day: 1 },
// and a number of months, adds the 'months' argument to the date
// If you increase the month +1 and day is over 28 and the next month
// doesn't have that day, it returns {} as an error
// You can add or minus months, eg +5, =5
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
            m = 12 - (Number(dateobj.month) - remainder)
        }


        result = {
            year: Number(dateobj.year) - y,
            month: m,
            day: Number(dateobj.day)
        }
    }

    let maxDays = daysInMonth(Number(result.month) - 1, Number(result.year))

    if (Number(dateobj.day) <= maxDays) {
        return result
    } else {
        return {}
    }
}


// Accepts 4 digit years.
function isYearValid(year, minyear, maxyear) {
    let text = /^\d{4}$/;
    let y = Number(year)

    if (y != 0) {
        if ((y != "") && (!text.test(y))) {
            return false;
        }

        if (String(y).length != 4) {
            return false;
        }

        if ((y < minyear) || (y > maxyear)) {
            console.log(`Year should be in range ${minyear} to ${maxyear}`);
            return false;
        }

        return true;
    } else {
        return false
    }
}


// unsigned number, not a decimal, no + or -
// consecutive numbers only
function isNumber(char) {
    return /^\d+$/.test(char);
}

// signed or unsigned number
function isNumberSign(char) {
    return /^[+|-]?\d+$/.test(char);
}

// extract numbers out of a string
function getNumbers(str) {
    return str.replace(/\D+/g, '')
}


function isObjectEmpty(value) {
    return (
        Object.prototype.toString.call(value) === '[object Object]' &&
        JSON.stringify(value) === '{}'
    );
}


function nextDayName(daynumberfrom, daynumberto, forward = true) {
    if (forward) {
        if (daynumberfrom > daynumberto) {
            return 7 - (daynumberfrom - daynumberto)
        } else {
            return daynumberto - daynumberfrom
        }
    } else {
        if (daynumberfrom >= daynumberto) {
            return daynumberfrom - daynumberto
        } else {
            return 7 - (daynumberto - daynumberfrom)
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


// show the week day in a number : Sunday - Saturday => 0 - 6
const daysNameList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]


// Returns offset from 1st of the month to the start of the week, how many days extra
// from 1st
function firstFullWeek(dateobj, daynumber, weeknum, startofweek = 1) {
    return nextDayName(dateToDay(dateobj), startofweek)
}


// Weeks in a month that start off with the set startofweek eg Monday
// The first one it counts as 1,
// It finds the daynumber, weeknum combination eg Sunday 3
// is 0, 3. It would find the 3rd Sunday of the month only counting
// Sundays that are in a full week where the specified week start
// starts in that month, not the previous month
// Returns the date object
function weekFullFirst(dateobj, daynumber, weeknum, startofweek = 1) {
    let startoffirstfullweek = nextDayName(dateToDay(dateobj), startofweek)
    let todaynumber = nextDayName(startofweek, daynumber)
    return {
        day: 1 + startoffirstfullweek + todaynumber + ((Number(weeknum) - 1) * 7),
        month: dateobj.month,
        year: dateobj.year
    }
}


// Weeks in a month that start off with the set startofweek eg Monday
// The last full week in a month it counts as 1,
// It finds the daynumber, weeknum combination eg Sunday 1
// is 0, 1. It would find the last Sunday of the month only counting
// Sundays that are in a full week where the specified week start
// starts in that month, not the previous month
// Returns the date object
function weekFullLast(dateobj, daynumber, weeknum, startofweek = 1) {
    let startoflastweeknotfull = nextDayName(dateToDay(dateobj), startofweek, false)
    let startoflastfullweek = startoflastweeknotfull + 7

    let lastdayinfullweek = nextDayName(startofweek, daynumber)
    // console.log(startoflastfullweek - lastdayinfullweek)

    return {
        day: dateobj.day - startoflastfullweek + lastdayinfullweek - ((Number(weeknum) - 1) * 7),
        month: dateobj.month,
        year: dateobj.year
    }
}


function weekFirst(dateobj, daynumber, weeknum, startofweek = 1) {
    let firstofmonthdaynumber = dateToDay(dateobj)
    let firstfoundoffset = nextDayName(firstofmonthdaynumber, daynumber)

    return {
        day: 1 + firstfoundoffset + ((Number(weeknum) - 1) * 7),
        month: dateobj.month,
        year: dateobj.year
    }
}

function weekLast(dateobj, daynumber, weeknum, startofweek = 1) {
    let lastofmonthdaynumber = dateToDay(dateobj)
    // move backwards to find the daynumber from the last day of the month
    let firstfoundoffset = nextDayName(lastofmonthdaynumber, daynumber, false)

    return {
        // day: 1 + firstfoundoffset + ((Number(weeknum) - 1) * 7),
        day: dateobj.day - firstfoundoffset - ((Number(weeknum) - 1) * 7),
        month: dateobj.month,
        year: dateobj.year
    }

}




// console.log(sameWeekCountDays(4, 4, 0)) // 0
// console.log(sameWeekCountDays(4, 4, 1)) // 0
// console.log(sameWeekCountDays(4, 4, 3)) // 0
// console.log(sameWeekCountDays(4, 4, 4)) // 0
// console.log(sameWeekCountDays(4, 4, 5)) // 0
// console.log(sameWeekCountDays(4, 4, 6)) // 0

// console.log(sameWeekCountDays(4, 1, 0)) // -3
// console.log(sameWeekCountDays(4, 1, 1)) // -3
// debugger
// console.log(sameWeekCountDays(4, 1, 4)) // 4
// console.log(sameWeekCountDays(4, 1, 6)) // -3

// console.log(sameWeekCountDays(1, 4, 0)) // 3
// console.log(sameWeekCountDays(1, 4, 1)) // 3
// debugger
// console.log(sameWeekCountDays(1, 4, 4)) // -4
// console.log(sameWeekCountDays(1, 4, 6)) // 3


// console.log("===========================")

// console.log(sameWeekCountDays(dayToNumberTwoLetter("mo"), dayToNumberTwoLetter("fr"), dayToNumberTwoLetter("mo"))) // 0
// console.log(sameWeekCountDays(dayToNumberTwoLetter("mo"), dayToNumberTwoLetter("sa"), dayToNumberTwoLetter("we"))) // 0

// console.log(sameWeekCountDays(dayToNumberTwoLetter("th"), dayToNumberTwoLetter("mo"), dayToNumberTwoLetter("sa"))) // 3

// console.log(sameWeekCountDays(dayToNumberTwoLetter("mo"), dayToNumberTwoLetter("th"))) // 0
