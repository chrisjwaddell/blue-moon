const DAY_MS = 86400000
let today = new Date()

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
    return dayOfTheWeek(Number(day), Number(month), Number(year))
}


// Find dayname for a Date
// Uses Zeller congruence
// https://www.geeksforgeeks.org/zellers-congruence-find-day-date/
function dayOfTheWeek(day, month, year) {
    if (month == 1) {
        month = 13;
        year--;
    }
    if (month == 2) {
        month = 14;
        year--;
    }
    let q = day;
    let m = month;
    let k = year % 100;
    let j = parseInt(year / 100, 10);
    let h = q + parseInt(13 * (m + 1) / 5, 10) + k + parseInt(k / 4, 10) + parseInt(j / 4, 10) + 5 * j;
    h = h % 7;

    h -= 1
    if (h === -1) h = 6

    return h
}


function dayToNumber(dayname) {
    return daysNameList.findIndex(day => day.toLowerCase() === dayname.toLowerCase());
}

function dayToNumberThreeLetter(daynamethreeletter) {
    return daysNameList.findIndex(day => day.slice(0, 3).toLowerCase() === daynamethreeletter.toLowerCase());
}


function testfn() {
    console.log("TESTING AREA ***********************")

}
// testfn()


console.log("*************************************************")


function BlueMoon(datesettings, pivotdate, opts) {

    // INITIALIZE
    const propertyList = ["day", "week", "month", "year", "occur"]
    const pivotList = ["day", "month", "year"]

    opts = opts || {};
    let startOfWeek = opts.startofweek || 1;

    let result = pdresult = {}
    resultWarning = ""
    resultError = ""


    // CALCULATE PIVOT DATE (PD)
    // if it's blank, the default is today
    let PDYvt = {},
        PDMvt = {},
        PDDvt = {}
    let pdy, pdm, pdd;

    if (pivotdate) {
        ({
            year: pdy,
            month: pdm,
            day: pdd
        } = pivotdate);

        let pdError = false;

        if (pdy) {
            PDYvt = valuetype(pdy, "pd-y")

            if (PDYvt.type === "absolute") {
                pdy = PDYvt.offset

                if (!isYearValid(PDYvt.offset, 1600, 2300)) {
                    resultError = errorWarningString(`Pivot date 'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`, resultError)
                    return resultsShow()
                }
            } else if (PDYvt.type === "relative") {
                pdy = PDYvt.offset

                if (isNumberSigned(PDYvt.offset)) {
                    if (Number(PDYvt.offset) > 500) {
                        resultWarning = errorwarningstring(`Pivot date 'year' is a high number - ${PDYvt.offset}. Are you sure this is correct?.`, resultWarning)
                    }
                }


            } else if (PDYvt.type === "current") {
                pdy = today.getFullYear()
            } else {
                pdError = true
                resultWarning = errorWarningString("Pivot date 'year' is invalid. Pivot date will be set to today (the default).", resultWarning)
                pdy = today.getFullYear()
            }
        }

        if (pdm) {
            PDMvt = valuetype(pdm, "pd-m")
            if (PDMvt.type === "absolute") {
                pdm = PDMvt.offset
                if ((Number(PDMvt.offset) < 1) || (Number(PDMvt.offset) > 12)) {
                    resultError = errorWarningString("Pivot date 'month' is less than 1 or greater than 12. You can't have 'month' outside of this range.", resultError)
                    return resultsShow()
                }

            } else if (PDMvt.type === "relative") {
                pdm = PDMvt.offset

                if (isNumberSigned(PDMvt.offset)) {
                    if (Number(PDMvt.offset) > 48) {
                        resultWarning = errorwarningstring("Pivot date 'month' is a high number. Why don't you use years and/or months instead.", resultWarning)
                    }
                }

            } else if (PDMvt.type === "current") {
                pdm = today.getMonth() + 1
            } else {
                pdError = true
                resultWarning = errorWarningString("Pivot date 'month' is invalid. Pivot date will be set to today (the default).", resultWarning)
                pdm = today.getMonth() + 1
            }
        }

        if (pdd) {
            PDDvt = valuetype(pdd, "pd-d")
            if (PDDvt.type === "absolute") {
                pdd = PDDvt.offset

                if ((Number(PDDvt.offset) < 1) || (Number(PDDvt.offset) > 31)) {
                    resultError = errorWarningString("Pivot date 'day' is outside the range of less than 1 or greater than 31. You can't have 'day' outside of this range. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.", resultError)
                    return resultsShow()
                } else if (PDDvt.offset > 28) {
                    // check D is not too high eg 29, use "end"
                    resultWarning = "Pivot date 'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month."
                }

            } else if (PDDvt.type === "relative") {
                pdd = PDDvt.offset

                if (isNumberSigned(PDDvt.offset)) {
                    if (Number(PDDvt.offset) > 365) {
                        resultWarning = errorWarningString("Pivot date 'day' is a high number. Why don't you use years and/or months instead.", resultWarning)
                    }
                }

            } else if (PDDvt.type === "current") {
                pdd = today.getDate()
            } else {
                pdError = true
                resultWarning = errorWarningString("Pivot date 'day' is invalid. Pivot date will be set to today (the default).", resultWarning)
                pdd = today.getDate()
            }
        }


        // General checks for pivot date
        for (let prop of Object.keys(pivotdate)) {
            if (!pivotList.includes(prop)) {
                pdError = true
                resultWarning = errorWarningString(`${prop} is a property that must be one of these property names - ${pivotList.toString()}. Pivot date will be set to today (the default).`, resultWarning)
            }
        }


        if (PDDvt.type === "relative") {
            if ((!isObjectEmpty(PDYvt)) || (!isObjectEmpty(PDMvt))) {
                pdError = true
                resultWarning = errorWarningString("Pivot date 'day' is relative. You can't have 'month' or 'year' in when 'day' is relative. Pivot date will be set to today (the default).", resultWarning)
            } else {
                pdresult = changeDay({
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear()
                }, DAY_MS * Number(PDDvt.offset))
            }

        } else {

            pdy = yearoffset(PDYvt, today.getFullYear())

            if ((PDYvt.type === "absolute") || (PDYvt.type === "current")) {
                if (!isYearValid(pdy, 1600, 2300)) {
                    resultWarning = errorWarningString(`'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`, resultWarning)
                }

                if ((PDMvt.type === "relative") || (PDMvt.type === "current")) {
                    let obj = {
                        year: pdy,
                        month: today.getMonth() + 1,
                        day: (PDDvt.offset === "monthend") ? 1 : pdd
                    }
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, (PDMvt.type === "current") ? 0 : Number(PDMvt.offset))
                    pdy = yy
                    pdm = mm
                    pdd = (pdd === "monthend") ? daysInMonth(pdm, pdy) : pdd

                    pdresult = {
                        year: pdy,
                        month: pdm,
                        day: (PDDvt.offset === "monthend") ? daysInMonth(pdm, pdy) : pdd
                    }
                    // return resultsShow()

                } else if (PDMvt.type === "absolute") {
                    pdresult = {
                        year: pdy,
                        month: pdm,
                        day: (PDDvt.offset === "monthend") ? daysInMonth(pdm, pdy) : pdd
                    }
                    // return resultsShow()

                } else {
                    pdError = true
                    resultWarning = errorWarningString(`Pivot date has 'day' as an absolute value. It must have 'month' and 'year' in. For relative 'day' such as 'day: "+1", it must not have 'month' or 'year' in. Even if you set 'month: "current"', that's sufficient. Pivot date will be set to today (the default).`, resultWarning)
                }

            } else if (PDYvt.type === "relative") {
                if (isNumberSigned(PDYvt.offset)) {
                    if (Number(PDYvt.offset) > 500) {
                        resultWarning = errorwarningstring(`'year' is a high number - ${PDYvt.offset}. Are you sure this is correct?.`, resultWarning)
                    }
                }

                if (PDMvt.type === "relative") {
                    let obj = {
                        year: pdy,
                        month: today.getMonth() + 1,
                        day: 1
                    }
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, Number(PDMvt.offset))
                    pdy = yy
                    pdm = mm
                    pdd = (pdd === "monthend") ? daysInMonth(pdm, pdy) : pdd

                    pdresult = {
                        year: pdy,
                        month: pdm,
                        day: pdd
                    }
                    // return resultsShow()

                } else if (PDMvt.type === "absolute") {
                    pdresult = {
                        year: pdy,
                        month: pdm,
                        day: (PDDvt.offset === "monthend") ? daysInMonth(pdm, pdy) : pdd
                    }

                } else {
                    pdError = true
                    resultWarning = errorWarningString(`Pivot date has 'day' as an absolute value. It must have 'month' and 'year' in. For relative 'day' such as 'day: "+1", it must not have 'month' or 'year' in. Even if you set 'month: "current"', that's sufficient. Pivot date will be set to today (the default).`, resultWarning)

                    // return resultsShow()
                }
            } else {
                pdError = true
                resultWarning = errorWarningString(`Pivot date has 'day' as an absolute value. It must have 'month' and 'year' in. For relative 'day' such as 'day: "+1", it must not have 'month' or 'year' in. Even if you set 'month: "current"', that's sufficient. Pivot date will be set to today (the default).`, resultWarning)
            }

        }


        if (pdError) {
            pdresult = {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            }

            pdy = today.getFullYear()
            pdm = today.getMonth() + 1
            pdd = today.getDate()
        }


    } else {
        pdresult = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        }
    }


    console.log("pdresult", pdresult)
    // console.log(resultWarning)



    if (isObjectEmpty(pdresult)) alert("pdresult empty")

    // console.log(pdy, pdm, pdd)

    // debugger



    // RELATIVE DATE SETTINGS

    // console.log(datesettings)

    let Dvt = {},
        Wvt = {},
        Mvt = {},
        Yvt = {},
        Ovt = {}
    let D, W, M, Y, O

    let firstOfMonth


    function resultsShow() {
        let maxDays = daysInMonth(Number(result.month), Number(result.year))

        if (maxDays < result.day) {
            resultError = errorWarningString(`The result has the month greater than the number of days in the month. ${JSON.stringify(result, null, 1)} has month ${JSON.stringify(result.month, null, 2)} which has ${maxDays} days in it. You can use 'monthend' as the 'day' value.`, resultError)
            result = {}
        }

        if ((resultWarning !== "") && ((!result.day) || (!result.month) || (!result.year))) {
            resultError = errorWarningString(`The result has the month greater than the number of days in the month.`, resultError)
            result = {}
        }
        // console.log(result)


        // let dateGreaterThanPivot = compareDateObjs(dateobj, pdresult)
        // console.log(dateGreaterThanPivot)



        if (!isObjectEmpty(result)) {
            // console.log(datesettings)
            // console.log(Dvt, Wvt, Mvt, Yvt)

            // (Dvt.type === "relative") This is a straight out result

            if (Dvt.type === "current") {
                // daily
                if (Mvt.type) {
                    if (Mvt.type === "absolute") {}

                }
            }

            // debugger
        }



        if (resultWarning !== "")
            console.log(`%cWARNING - ${resultWarning}`, 'color: blue; font-size: 16px');
        if (resultError !== "")
            console.error(`%cERROR - ${resultError}`, 'color: red; font-size: 16px');
        return result
    }





    // General checks
    for (let prop of Object.keys(datesettings)) {
        if (!propertyList.includes(prop)) {
            resultError = errorWarningString(`${prop} is a property that must be one of these property names - ${propertyList.toString()}`, resultError)
            return resultsShow()
        }
    }


    // a quick parse
    if (datesettings.day) {
        Dvt = valuetype(datesettings.day, "d")
        if (Dvt.type === "error") {
            resultError = errorWarningString(`'day' is invalid.`, resultError)
            return resultsShow()
        } else if (Dvt.type === "absolute") {
            if ((Number(Dvt.offset) < 1) || (Number(Dvt.offset) > 31)) {
                resultError = errorWarningString("'day' is outside the range of less than 1 or greater than 31. You can't have 'day' outside of this range. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.", resultError)
                return resultsShow()
            } else if (Dvt.offset > 28) {
                // check D is not too high eg 29, use "end"
                resultWarning = "'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month."
            }
        } else if (Dvt.type === "relative") {
            if (isNumberSigned(Dvt.offset)) {
                if (Number(Dvt.offset) > 365) {
                    resultWarning = errorWarningString("'day' is a high number. Why don't you use years and/or months instead.", resultWarning)
                }
            }
        }
    } else {
        resultError = errorWarningString("'day' property is empty. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.", resultError)
        return resultsShow()
    }


    if (datesettings.week) {
        Wvt = valuetype(datesettings.week, "w")
        if (Wvt.type === "error") {
            resultError = errorWarningString(`'week' is invalid.`, resultError)
            return resultsShow()
        } else if (Wvt.type === "absolute") {
            if ((Number(Wvt.offset) < 1) || (Number(Wvt.offset) > 53)) {
                resultError = errorWarningString("'week' is less than 1 or greater than 53. You can't have 'week' outside of this range.", resultError)
                return resultsShow()
            }
        } else if (Wvt.type === "relative") {
            if (isNumberSigned(Wvt.offset)) {
                if (Number(Wvt.offset) > 53) {
                    resultWarning = errorwarningstring("'week' is a high number. Why don't you use years and/or months instead.", resultWarning)
                }
            }
        }
    }

    if (datesettings.month) {
        Mvt = valuetype(datesettings.month, "m")
        if (Mvt.type === "error") {
            resultError = errorWarningString(`'month' is invalid.`, resultError)
            return resultsShow()
        } else if (Mvt.type === "absolute") {
            if ((Number(Mvt.offset) < 1) || (Number(Mvt.offset) > 12)) {
                resultError = errorWarningString("'month' is less than 1 or greater than 12. You can't have 'month' outside of this range.", resultError)
                return resultsShow()
            }
            M = Number(Mvt.offset)
        } else if (Mvt.type === "current") {
            M = pdresult.month
        } else if (Mvt.type === "relative") {
            if (isNumberSigned(Mvt.offset)) {
                if (Number(Mvt.offset) > 48) {
                    resultWarning = errorwarningstring("'month' is a high number. Why don't you use years and/or months instead.", resultWarning)
                }
            }
        }

    } else {
        M = pdresult.month
    }

    if (datesettings.year) {
        Yvt = valuetype(datesettings.year, "y")
        if (Yvt.type === "error") {
            resultError = errorWarningString(`'year' is invalid. 'year' isn't a number.`, resultError)
            return resultsShow()
        } else if (Yvt.type === "absolute") {
            if (!isYearValid(Yvt.offset, 1600, 2300)) {
                resultError = errorWarningString(`'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`, resultError)
                return resultsShow()
            }
        } else if (Yvt.type === "relative") {
            if (isNumberSigned(Yvt.offset)) {
                if (Number(Yvt.offset) > 500) {
                    resultWarning = errorwarningstring(`'year' is a high number - ${Yvt.offset}. Are you sure this is correct?.`, resultWarning)
                }
            }
        }
    }


    if (datesettings.day) {
        D = Number(Dvt.offset)

        if (Dvt.type === "absolute") {
            if (datesettings.week) {
                resultError = errorWarningString("'day' is set as an absolute number. You can't have any setting for 'week'. You can optionally have settings for 'month' and 'year', they must be absolute ie a specific number, but not for 'week'.", resultError)
                return resultsShow()
            }

            Y = yearoffset(Yvt, pdresult.year)

            if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : pdresult.year,
                    month: pdresult.month,
                    day: (Dvt.offset === "monthend") ? 1 : D
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D

                result = {
                    year: Y,
                    month: M,
                    day: D
                }
                return resultsShow()
            } else {
                result = {
                    year: Y,
                    month: M,
                    day: (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D
                }
                return resultsShow()
            }


        } else if (Dvt.type === "relative") {
            if (!isObjectEmpty(Wvt) || !isObjectEmpty(Mvt) || !isObjectEmpty(Yvt)) {
                resultError = errorWarningString("'day' is relative. You can't have 'week', 'month' or 'year' settings. Eg if it's tomorrow (day: -1), you can't set week, month or year.", resultError)
                return resultsShow()
            }

            result = changeDay({
                year: pdresult.year,
                month: pdresult.month,
                day: pdresult.day
            }, DAY_MS * Number(Dvt.offset))
            return resultsShow()


        } else if (Dvt.type === "current") {

            // if (datesettings.week) {
            //     resultError"] = "'day' is 'current'. You can't have any setting for 'week'. You can optionally have settings for 'month' and 'year', they must be absolute ie a specific number, but not for 'week'."
            //     return result
            // }

            resultWarning = errorWarningString(`'day' is set to 'current'. If you run this frequently, and if the day is 29, 30 or 31 and you are adding 1 month, some months may not have 31 or 30 days in them so you will get an error with a blank result. You can use 'day: "+30" or 'week: "+4"'.`, resultWarning)

            Y = yearoffset(Yvt, pdresult.year)

            if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : pdresult.year,
                    month: pdresult.month,
                    day: pdresult.day
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = dd

                result = {
                    year: Y,
                    month: M,
                    day: D
                }
                return resultsShow()

            } else {
                result = {
                    // year: Y,
                    year: Y,
                    month: M,
                    day: pdresult.day
                }
                return resultsShow()
            }



        } else if (Dvt.type === "dayofweek") {
            Y = yearoffset(Yvt, pdresult.year)

            if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : pdresult.year,
                    month: pdresult.month,
                    day: pdresult.day
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = dd
            }


            firstOfMonth = {
                year: Y,
                month: M,
                day: 1
            }

            let monthcurrent = {
                year: Y,
                month: M,
                day: pdresult.day
            }


            // day of week with Week number, it's next node is Month
            // { day: "Monday", week: 2 } means every month, Monday
            // of the 2nd week of each month

            if (Wvt.type === "absolute") {
                W = Number(Wvt.offset)

                let diff = sameWeekCountDays(dateToDay(firstOfMonth), Dvt.offset, startOfWeek) + ((Number(Wvt.offset) - 1) * 7)

                result = changeDay(firstOfMonth, diff * DAY_MS)
                return resultsShow()

            } else if ((Wvt.type === "current") || (!Wvt.type)) {

                let diff = sameWeekCountDays(dateToDay(monthcurrent), Dvt.offset, startOfWeek)

                result = changeDay(monthcurrent, diff * DAY_MS)
                return resultsShow()

            } else if (Wvt.type === "relative") {
                let diff = sameWeekCountDays(dateToDay(monthcurrent), Dvt.offset, startOfWeek) + ((Number(Wvt.offset)) * 7)

                result = changeDay(monthcurrent, diff * DAY_MS)
                return resultsShow()
            }


        } else if (Dvt.type === "dayofweek weeknum") {
            if (!isObjectEmpty(Wvt)) {
                resultError = errorWarningString("'day' is a dayname with a number eg 'Sunday 2', but it means 2nd Sunday of each month, it can't have a 'week' setting.", resultError)
                return resultsShow()
            }

            Y = yearoffset(Yvt, pdresult.year)

            if (Mvt.type === "relative") {
                let obj = {
                    year: (Y) ? Y : pdresult.year,
                    month: pdresult.month,
                    day: pdresult.day
                }

                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, Number(Mvt.offset))
                Y = yy
                M = mm
                D = dd
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

            if (!/^\*?-?\d{1,1}$/.test(Dvt.offset[1])) {
                resultError = errorWarningString(`'day' is in an incorrect format. It must be something like 'day: "Monday 2"' (2nd Monday of the month), 'day: "tue -1"' (Last Tuesday of the month), 'day: "Friday *2"' (2nd Friday of the month only counting full weeks) or 'day: "Monday *-2"' (2nd last Monday of the month only counting full weeks). The number must be less than 5.`, resultError)
                return resultsShow()
            }

            if (Dvt.offset[1][0] === "*") {
                if (Math.abs(Number(Dvt.offset[1].slice(1))) >= 4) {
                    resultWarning = errorWarningString(`There are maximum 4 full weeks in a month. Weekdays in the later part of the week for full weeks as you specified don't always occur so you may get a blank result. Instead of opting for the 4th occurrence of a day, you can opt for the last eg 'day: "Friday -1"' or 'day: "Sunday *-1"'`, resultWarning)
                }
                if (Number(Dvt.offset[1].slice(1)) > 0) {
                    result = weekFullFirst(firstOfMonth, Number(Dvt.offset[0]), Number(Dvt.offset[1].slice(1)), startOfWeek)
                    return resultsShow()
                } else {
                    result = weekFullLast(lastOfMonth, Number(Dvt.offset[0]), Math.abs(Number(Dvt.offset[1].slice(1))), startOfWeek)
                    return resultsShow()
                }
            } else {
                if (Number(Dvt.offset[1]) > 0) {
                    result = weekFirst(firstOfMonth, Number(Dvt.offset[0]), Number(Dvt.offset[1]), startOfWeek)
                    return resultsShow()
                } else {
                    result = weekLast(lastOfMonth, Number(Dvt.offset[0]), Math.abs(Number(Dvt.offset[1])), startOfWeek)
                    return resultsShow()
                }
            }


        } else {
            // nothing entered, return current day
            result = {
                year: pdresult.year,
                month: pdresult.month,
                day: pdresult.day
            }
            resultError = errorWarningString("'day' property has no value. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.", resultError)
            return resultsShow()
        }
    }


    // --------------------------------------

    // Description
    if (Dvt.type === "absolute" || Dvt.type === "current") {
        // if (Wvt.type === "absolute" || Wvt.type === "relative") {
        if (!datesettings.week) {

        }
    }


    function yearoffset(valuetype, yearbase) {
        if (valuetype.type === "absolute") {
            return Number(valuetype.offset)
        } else if (valuetype.type === "current") {
            return yearbase
        } else if (valuetype.type === "relative") {
            return yearbase + Number(valuetype.offset)
        } else {
            return yearbase
        }
    }



    function errorWarningString(msg, str) {
        return (str) ? str + "\n" + msg : msg
    }

    // function warningstring(msg, warningstring) {
    //     return (warningstring) ? warningstring + "\n" + msg : msg
    // }

}



function valuetype(str, datetype) {
    let val = String(str).trim()

    if (isNumber(val)) {
        return {
            type: "absolute",
            offset: Number(val)
        }
    } else if (isNumberSigned(val)) {
        return {
            type: "relative",
            offset: val
        }
    } else {
        if (val === "current") {
            return {
                type: "current",
                offset: val
            }
        } else if ((val === "monthend") && ((datetype === "d") || (datetype === "pd-d"))) {
            return {
                type: "absolute",
                offset: val
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
        } else {
            return {
                type: "error",
                offset: "error"
            }
        }

    }
}


function loop(datesettings, pivotdate, datesbefore, datesafter, startofweek) {
    let arr = [];
    let arrnew = [];

    let iteration = BlueMoon(datesettings, pivotdate, startofweek)

    if (isObjectEmpty(iteration)) {
        return []
    }

    let Dvt = {},
        Mvt = {},
        Yvt = {}

    Dvt = valuetype(datesettings.day, "d")
    Mvt = valuetype(datesettings.month, "m")
    Yvt = valuetype(datesettings.year, "y")


    let zeroiterator = BlueMoon(datesettings, pivotdate, startofweek)

    console.log("result", iteration);
    let startbase = iteration

    for (let i = 0; i < datesbefore; i++) {
        iteration = occurrences(datesettings, iteration, -1, Dvt, Mvt, Yvt, startofweek)
        arr.push(iteration)
        console.log(iteration)
        // BlueMoon(datesettings, pivotdate, startofweek = 1)
    }

    arrnew = arr.reverse()

    arrnew.push(zeroiterator)

    iteration = startbase
    for (let i = 0; i < datesafter; i++) {
        iteration = occurrences(datesettings, iteration, 1, Dvt, Mvt, Yvt, startofweek)
        arrnew.push(iteration)
        // console.log(iteration)
        // BlueMoon(datesettings, pivotdate, startofweek = 1)
    }

    console.log(arrnew)
    return arrnew
}


function occurrences(datesettings, pivotdate, forwardbackwards, Dvt, Mvt, Yvt, startofweek) {
    //forwardbackwards - 1 = forwards
    // day must be in

    // datesettings, pivotdate, startofweek = 1
    let newdate = {}

    // let dateGreaterThanPivot = compareDateObjs(dateobj, pdresult)
    // console.log(dateGreaterThanPivot)

    if ((Dvt.type === "relative") || (Dvt.type === "current")) {
        return changeDay(pivotdate, DAY_MS * forwardbackwards)

    } else if (Dvt.type === "dayofweek") {
        return changeMonth(pivotdate, 7 * forwardbackwards)

    } else if (Dvt.type === "dayofweek weeknum") {
        let next = changeMonth(pivotdate, 1 * forwardbackwards)

        return BlueMoon(datesettings, {
            year: next.year,
            month: next.month,
            day: 1
        }, startofweek)

    } else if ((Mvt.type === "relative") || (Mvt.type === "current")) {
        return changeMonth(pivotdate, forwardbackwards)

    } else if ((Yvt.type === "relative") || (Yvt.type === "current")) {
        if (datesettings.month) {
            if (Mvt.type === "absolute") {
                // month is absolute
                return {
                    year: pivotdate.year + (1 * forwardbackwards),
                    month: pivotdate.month,
                    day: pivotdate.day
                }
            } else {
                return changeMonth(pivotdate, forwardbackwards)
            }
        } else {
            return changeMonth(pivotdate, forwardbackwards)
        }

    } else {
        if (datesettings.month) {
            if (Mvt.type === "absolute") {
                if (!datesettings.year) {
                    // month absolute, year empty -> year increment
                    return {
                        year: pivotdate.year + (1 * forwardbackwards),
                        month: pivotdate.month,
                        day: pivotdate.day
                    }

                } else {
                    // day, month and year are absolute
                    return pivotdate
                }
            }

        } else {
            if (!datesettings.year) {
                // day in but not month or year  => month increment
                return changeMonth(pivotdate, forwardbackwards)

            } else {
                // day, year
                return changeMonth(pivotdate, forwardbackwards)
            }

        }
    }
}

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
            m = 12 - remainder + 1
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


// Accepts 4 digit years.
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


// unsigned number, not a decimal, no + or -
// consecutive numbers only
function isNumber(char) {
    return /^\d+$/.test(char);
}

// It can be signed or unsigned number
function isNumberSign(char) {
    return /^[+|-]?\d+$/.test(char);
}

function isNumberSigned(char) {
    return /^[+|-]\d+$/.test(char);
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


function compareDateObjs(dateobj1, dateobj2) {
    // 1 = dateobj1 > dateobj2
    // 0 they're equal
    let compare = 0

    if (dateobj1.year > dateobj2.year) {
        compare = 1
    } else if (dateobj1.year < dateobj2.year) {
        compare = -1
    } else {
        if (dateobj1.month > dateobj2.month) {
            compare = 1
        } else if (dateobj1.month < dateobj2.month) {
            compare = -1
        } else {
            if (dateobj1.day > dateobj2.day) {
                compare = 1
            } else if (dateobj1.day < dateobj2.day) {
                compare = -1
            } else {
                compare = 0
            }
        }
    }

    return compare
}


function incrementMonth(dateobj) {
    let {
        year: yy,
        month: mm,
        day: dd
    } = changeMonth(dateobj, 1)

    return {
        year,
        month,
        day
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

// console.log(sameWeekCountDays(dayToNumberThreeLetter("mo"), dayToNumberThreeLetter("fr"), dayToNumberThreeLetter("mo"))) // 0
// console.log(sameWeekCountDays(dayToNumberThreeLetter("mo"), dayToNumberThreeLetter("sa"), dayToNumberThreeLetter("we"))) // 0

// console.log(sameWeekCountDays(dayToNumberThreeLetter("th"), dayToNumberThreeLetter("mo"), dayToNumberThreeLetter("sa"))) // 3

// console.log(sameWeekCountDays(dayToNumberThreeLetter("mo"), dayToNumberThreeLetter("th"))) // 0

// see if result is less than pivot date


function testcheckResult() {
    let Dvt = {},
        Mvt = {},
        Yvt = {}
    Dvt.type = "absolute"
    Dvt.offset = "1"
    Mvt.type = "absolute"
    Mvt.offset = 12
    Yvt.type = "absolute"
    Yvt.offset = 2022

    let input = {
        day: 1,
        month: 12,
        year: 2022
    }
    let r = BlueMoon(input)
    console.log(r)

    let o = occurrences(r, {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    }, Yvt, Mvt, Dvt)

    console.log(o)


    // let c = changeDay(r, 10)

}



function checkResult(dateobj, pdresult, Yvt, Mvt, Dvt) {
    let newdate = {}


    if (Yvt.type === "absolute") {
        if (Mvt.type === "absolute") {
            // nothing

        } else if (Mvt.type === "relative") {
            // nothing

            if (Dvt.type === "absolute") {
                if (dateobj.day < pdresult.day) {
                    // incrementg by one month since year and month are both relative and day is absolute
                    let obj = {
                        year: dateobj.year,
                        month: dateobj.month,
                        day: dateobj.day
                    }
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, 1)
                    newdate.year = yy
                    newdate.month = mm
                    newdate.day = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D
                }

            } else if (Dvt.type === "relative") {
                // nothing, it isn't in, D relative is only allowed on its own

            } else if (Dvt.type === "current") {
                // nothing

            } else if (Dvt.type === "monthend") {
                // incrementg by one month since year and month are both relative and day is absolute
                let obj = {
                    year: dateobj.year,
                    month: dateobj.month,
                    day: dateobj.day
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, 1)
                newdate.year = yy
                newdate.month = mm
                newdate.day = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D
            }


        } else if (Mvt.type === "current") {
            // nothing

        } else {
            // No month

        }


    } else if (Yvt.type === "relative") {
        if (Mvt.type === "absolute") {
            if (dateobj.year === pdresult.year) {
                if (dateobj.month < pdresult.month) {
                    newdate.year += 1
                }
            }

        } else if (Mvt.type === "relative") {
            if (dateobj.year === pdresult.year) {
                if (dateobj.month < pdresult.month) {
                    newdate.month = pdresult.month

                    if (Dvt.type === "monthend") {
                        newdate.day = daysInMonth(Number(dateobj.month), Number(dateobj.year))
                    } else if (daysInMonth(Number(dateobj.month), Number(dateobj.year)) < dateobj.date) {
                        newdate.day = daysInMonth(Number(dateobj.month), Number(dateobj.year))
                    }


                } else if (dateobj.month === pdresult.month) {
                    if (Dvt.type === "absolute") {
                        if (dateobj.day < pdresult.day) {
                            // incrementg by one month since year and month are both relative and day is absolute
                            let obj = {
                                year: dateobj.year,
                                month: dateobj.month,
                                day: dateobj.day
                            }
                            let {
                                year: yy,
                                month: mm,
                                day: dd
                            } = changeMonth(obj, 1)
                            newdate.year = yy
                            newdate.month = mm
                            newdate.day = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D

                        }

                    } else if (Dvt.type === "relative") {
                        // nothing, it isn't in, D relative is only allowed on its own

                    } else if (Dvt.type === "current") {
                        // nothing

                    } else if (Dvt.type === "monthend") {
                        // incrementg by one month since year and month are both relative and day is absolute
                        let obj = {
                            year: dateobj.year,
                            month: dateobj.month,
                            day: dateobj.day
                        }
                        let {
                            year: yy,
                            month: mm,
                            day: dd
                        } = changeMonth(obj, 1)
                        newdate.year = yy
                        newdate.month = mm
                        newdate.date = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D

                    }

                }
            }


        } else if (Mvt.type === "current") {

            if (Dvt.type === "absolute") {
                if (dateobj.day < pdresult.day) {
                    // incrementg by one month since year and month are both relative and day is absolute
                    let obj = {
                        year: dateobj.year,
                        month: dateobj.month,
                        day: dateobj.day
                    }
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, 1)
                    newdate.year = yy
                    newdate.month = mm
                    newdate.day = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D

                }

            } else if (Dvt.type === "relative") {
                // nothing

            } else if (Dvt.type === "current") {
                // nothing, it isn't in, D relative is only allowed on its own

            } else if (Dvt.type === "monthend") {
                // incrementg by one month since year and month are both relative and day is absolute
                let obj = {
                    year: dateobj.year,
                    month: dateobj.month,
                    day: dateobj.day
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, 1)
                Y = yy
                M = mm
                D = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D

            }

        } else {
            // No month

        }



    } else if (Yvt.type === "current") {


        if (Mvt.type === "absolute") {
            // nothing

        } else if (Mvt.type === "relative") {
            // nothing

            if (Dvt.type === "absolute") {
                if (dateobj.day < pdresult.day) {
                    // incrementg by one month since year and month are both relative and day is absolute
                    let obj = {
                        year: dateobj.year,
                        month: dateobj.month,
                        day: dateobj.day
                    }
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, 1)
                    newdate.year = yy
                    newdate.month = mm
                    newdate.day = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D
                }

            } else if (Dvt.type === "relative") {
                // nothing, it isn't in, D relative is only allowed on its own

            } else if (Dvt.type === "current") {
                // nothing

            } else if (Dvt.type === "monthend") {
                // incrementg by one month since year and month are both relative and day is absolute
                let obj = {
                    year: dateobj.year,
                    month: dateobj.month,
                    day: dateobj.day
                }
                let {
                    year: yy,
                    month: mm,
                    day: dd
                } = changeMonth(obj, 1)
                newdate.year = yy
                newdate.month = mm
                newdate.day = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D
            }


        } else if (Mvt.type === "current") {
            // nothing


        } else {
            // No month

        }





    } else {
        // no year

        if (Mvt.type === "absolute") {

            if (Dvt.type === "absolute") {
                if (dateGreaterThanPivot === -1) {
                    // incrementg by one month since year and month are both relative and day is absolute
                    newdate.year = dateobj.year + 1
                    if (Dvt.offset === "monthend") {
                        newdate.day = daysinMonth(dateobj.month, dateobj.year)
                    }
                }

            } else if (Dvt.type === "relative") {
                if (dateGreaterThanPivot === -1) {
                    // incrementg by one month since year and month are both relative and day is absolute
                    newdate.year = dateobj.year + 1
                }

            } else if (Dvt.type === "current") {
                if (dateGreaterThanPivot === -1) {
                    // incrementg by one month since year and month are both relative and day is absolute
                    newdate.year = dateobj.year + 1
                }
            }



        } else if (Mvt.type === "relative") {
            // relative needs to stay the same relative to pivot date
            // regardless of if its greater than or less than pivot date

        } else if (Mvt.type === "current") {
            // nothing

        } else {
            // No month



        }

    }


    return {
        year: (newdate.year) ? newdate.year : dateobj.year,
        month: (newdate.month) ? newdate.month : dateobj.month,
        day: (newdate.day) ? newdate.day : dateobj.day,
    }

}
