var BlueMoon = (function () {
    'use strict';

    /* ******************************************************************************
     * OBJECT
     *******************************************************************************/

    // Checks if an object is a plain object, that is, an object created
    // by the Object constructor or one with a [[Prototype]] of null.
    // It excludes arrays, functions, null and dates
    // which are all technically objects

    function isObjectPlain(obj) {
        return obj === null ? false :
            obj === undefined ? false :
            Object.prototype.toString.call(obj) === "[object Object]"
    }

    // For earlier versions of IE, Object.prototype.toString returns "[object Object]" for null and undefined so those checks are included


    function isObjectEmpty(value) {
        return (
            Object.prototype.toString.call(value) === '[object Object]' &&
            JSON.stringify(value) === '{}'
        );
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
    ];


    function dayToNumber(dayname) {
        return daysNameList.findIndex(day => day.toLowerCase() === dayname.toLowerCase());
    }

    function dayToNumberThreeLetter(daynamethreeletter) {
        return daysNameList.findIndex(day => day.slice(0, 3).toLowerCase() === daynamethreeletter.toLowerCase());
    }

    const DAY_MS = 86400000;

    // Accepts 4 digit years.
    // Min and max values optional
    function isYearValid(year, minyear, maxyear) {
        let text = /^\d{4}$/;
        let y = Number(year);

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


    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    }

    /**
      function that takes month number and its year and returns the number of days within it
      * @param monthnumber.
      * @param year.
    */
    function daysInMonth(month, year) {
        const days = [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31,
            30, 31, 31, 30, 31, 30, 31
        ];
        return days[month - 1]
    }


    // changeDay uses UTC to set and get the day, month and year so that no
    // timezone rules can change the time. UTC is a time standard.
    // In dateobj, month 1 is January
    // 12 midday is used just to be on the safe side
    function changeDay(dateobj, ms) {
        let dt = new Date(Date.UTC(dateobj.year, dateobj.month - 1, dateobj.day, 12, 0, 0, 0));
        let dt2 = new Date(dt.valueOf() + ms);

        return {
            year: dt2.getUTCFullYear(),
            month: dt2.getUTCMonth() + 1,
            day: dt2.getUTCDate()
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
    function changeMonth(dateobj, months) {
        let y = Math.floor(Math.abs(months) / 12);
        let remainder = Math.abs(months % 12);
        let m;

        let result = {};

        if (months >= 0) {
            if (Number(dateobj.month) + remainder > 12) {
                y += 1;
                m = Number(dateobj.month) + remainder - 12;
            } else {
                m = Number(dateobj.month) + remainder;
            }

            result = {
                year: Number(dateobj.year) + y,
                month: m,
                day: Number(dateobj.day)
            };

        } else {
            if (Number(dateobj.month) - remainder > 0) {
                m = Number(dateobj.month) - remainder;
            } else {
                y += 1;
                m = 12 + Number(dateobj.month) - remainder;
            }


            result = {
                year: Number(dateobj.year) - y,
                month: m,
                day: Number(dateobj.day)
            };
        }

        let maxDays = daysInMonth(Number(result.month), Number(result.year));

        if (Number(dateobj.day) <= maxDays) {
            return result
        } else {
            return {}
        }
    }


    function nextDayName(daynumberfrom, daynumberto, forward = true) {
        if (forward) {
            if (daynumberfrom > daynumberto) {
                return 7 + daynumberfrom - daynumberto
            } else {
                return daynumberto - daynumberfrom
            }
        } else {
            if (daynumberfrom >= daynumberto) {
                return daynumberfrom - daynumberto
            } else {
                return 7 + daynumberfrom - daynumberto
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
            let df = (daynumberfrom < startofweek) ? daynumberfrom + 7 : daynumberfrom;
            let dt = (daynumberto < startofweek) ? daynumberto + 7 : daynumberto;

            return dt - df
        }

    }

    /* ******************************************************************************
     * NUMBER
     *******************************************************************************/

    // unsigned number, not a decimal, no + or -
    // consecutive numbers only
    function isNumber(char) {
        return /^\d+$/.test(char);
    }

    function isNumberSigned(char) {
        return /^[+|-]\d+$/.test(char);
    }

    const dateToDay = (dateobj) => {

        const {
            year,
            month,
            day
        } = dateobj;

        if (day < 0 || day > 31 || month > 12 || month < 1) {
            return new TypeError('Date is not valid.')
        }

        // JS months start at 0
        return dayOfTheWeek(Number(day), Number(month), Number(year))
    };


    // Find dayname for a Date
    // Uses Zeller congruence
    // https://www.geeksforgeeks.org/zellers-congruence-find-day-date/
    // https: //github.com/TheAlgorithms/JavaScript/blob/master/Conversions/DateToDay.js
    function dayOfTheWeek(day, month, year) {
        // In case of Jan and Feb:
        // Year: we consider it as previous year
        // e.g., 1/1/1987 here year is 1986 (-1)
        // Month: we consider value as 13 & 14 respectively
        if (month < 3) {
            year--;
            month += 12;
        }

        // divide year into century and the last two digits of the century
        const yearDigits = year % 100;
        const century = Math.floor(year / 100);

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
        const weekDay = (day + Math.floor((month + 1) * 2.6) + yearDigits + Math.floor(yearDigits / 4) + Math.floor(century / 4) + 5 * century) % 7;

        return weekDay
    }

    /* ******************************************************************************
     * DEBUGGING
     *******************************************************************************/

    function errorWarningString(msg, str) {
        return (str) ? str + "\n" + msg : msg
    }

    /** @license
     *  ----------------------------------------------------------------------------
     *  Blue Moon Date API - <https://github.com/chrisjwaddell/blue-moon>
     *  Licensed under MIT
     *  Copyright Chris Waddell
     *  ----------------------------------------------------------------------------
     */


    let today = new Date();

    function BlueMoon(datesettings, pivotdate, opts) {

        opts = opts || {};
        opts.startOfWeek || 1;
        let datesBefore = opts.datesBefore;
        let datesAfter = opts.datesAfter;


        if (!isObjectPlain(datesettings)) {
            return new TypeError('Argument is not an object.')
        }


        // if datesBefore or datesAfter are in, BlueMoon returns an array
        // of dates
        if (datesBefore || datesAfter) {
            return loop(datesettings, pivotdate, opts)

        } else {
            let firstIteration = iteration(datesettings, pivotdate, opts);

            return firstIteration
        }

    }


    function iteration(datesettings, pivotdate, opts) {
        // ^INITIALIZE
        const propertyList = ["day", "week", "month", "year", "occur"];
        const pivotList = ["day", "month", "year"];

        opts = opts || {};
        let startOfWeek = opts.startofweek || 1;
        let returnDate = (opts.returnDate !== undefined) ? Boolean(opts.returnDate) : true;

        let result = {};
        let pdresult = {};
        let resultWarning = "";
        let resultError = "";


        // ^CALCULATE PIVOT DATE (PD)
        // if it's blank, the default is today
        let PDYvt = {},
            PDMvt = {},
            PDDvt = {};
        let pdy, pdm, pdd;

        if (pivotdate) {
            if (!isObjectEmpty(pivotdate)) {
                ({
                    year: pdy,
                    month: pdm,
                    day: pdd
                } = pivotdate);

                let pdError = false;

                if (pdy) {
                    PDYvt = valuetype(pdy, "pd-y");

                    if (PDYvt.type === "absolute") {
                        pdy = PDYvt.offset;

                        if (!isYearValid(PDYvt.offset, 1600, 2300)) {
                            resultError = errorWarningString(`Pivot date 'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`, resultError);
                            return resultsShow()
                        }
                    } else if (PDYvt.type === "relative") {
                        pdy = PDYvt.offset;

                        if (isNumberSigned(PDYvt.offset)) {
                            if (Number(PDYvt.offset) > 500) {
                                resultWarning = errorWarningString(`Pivot date 'year' is a high number - ${PDYvt.offset}. Are you sure this is correct?.`, resultWarning);
                            }
                        }


                    } else if (PDYvt.type === "current") {
                        pdy = today.getFullYear();
                    } else {
                        pdError = true;
                        resultWarning = errorWarningString("Pivot date 'year' is invalid. Pivot date will be set to today (the default).", resultWarning);
                        pdy = today.getFullYear();
                    }
                }

                if (pdm) {
                    PDMvt = valuetype(pdm, "pd-m");
                    if (PDMvt.type === "absolute") {
                        pdm = PDMvt.offset;
                        if ((Number(PDMvt.offset) < 1) || (Number(PDMvt.offset) > 12)) {
                            resultError = errorWarningString("Pivot date 'month' is less than 1 or greater than 12. You can't have 'month' outside of this range.", resultError);
                            return resultsShow()
                        }

                    } else if (PDMvt.type === "relative") {
                        pdm = PDMvt.offset;

                        if (isNumberSigned(PDMvt.offset)) {
                            if (Number(PDMvt.offset) > 48) {
                                resultWarning = errorWarningString("Pivot date 'month' is a high number. Why don't you use years and/or months instead.", resultWarning);
                            }
                        }

                    } else if (PDMvt.type === "current") {
                        pdm = today.getMonth() + 1;
                    } else {
                        pdError = true;
                        resultWarning = errorWarningString("Pivot date 'month' is invalid. Pivot date will be set to today (the default).", resultWarning);
                        pdm = today.getMonth() + 1;
                    }
                }

                if (pdd) {
                    PDDvt = valuetype(pdd, "pd-d");
                    if (PDDvt.type === "absolute") {
                        pdd = PDDvt.offset;

                        if ((Number(PDDvt.offset) < 1) || (Number(PDDvt.offset) > 31)) {
                            resultError = errorWarningString("Pivot date 'day' is outside the range of less than 1 or greater than 31. You can't have 'day' outside of this range. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.", resultError);
                            return resultsShow()
                        } else if (PDDvt.offset > 28) {
                            // check D is not too high eg 29, use "end"
                            resultWarning = "Pivot date 'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.";
                        }

                    } else if (PDDvt.type === "relative") {
                        pdd = PDDvt.offset;

                        if (isNumberSigned(PDDvt.offset)) {
                            if (Number(PDDvt.offset) > 365) {
                                resultWarning = errorWarningString("Pivot date 'day' is a high number. Why don't you use years and/or months instead.", resultWarning);
                            }
                        }

                    } else if (PDDvt.type === "current") {
                        pdd = today.getDate();
                    } else {
                        pdError = true;
                        resultWarning = errorWarningString("Pivot date 'day' is invalid. Pivot date will be set to today (the default).", resultWarning);
                        pdd = today.getDate();
                    }
                }


                // General checks for pivot date
                for (let prop of Object.keys(pivotdate)) {
                    if (!pivotList.includes(prop)) {
                        pdError = true;
                        resultWarning = errorWarningString(`${prop} is a property that must be one of these property names - ${pivotList.toString()}. Pivot date will be set to today (the default).`, resultWarning);
                    }
                }


                if (PDDvt.type === "relative") {
                    if ((!isObjectEmpty(PDYvt)) || (!isObjectEmpty(PDMvt))) {
                        pdError = true;
                        resultWarning = errorWarningString("Pivot date 'day' is relative. You can't have 'month' or 'year' in when 'day' is relative. Pivot date will be set to today (the default).", resultWarning);
                    } else {
                        pdresult = changeDay({
                            day: today.getDate(),
                            month: today.getMonth() + 1,
                            year: today.getFullYear()
                        }, DAY_MS * Number(PDDvt.offset));
                    }

                } else {

                    pdy = yearoffset(PDYvt, today.getFullYear());

                    if ((PDYvt.type === "absolute") || (PDYvt.type === "current")) {
                        if (!isYearValid(pdy, 1600, 2300)) {
                            resultWarning = errorWarningString(`'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`, resultWarning);
                        }

                        if ((PDMvt.type === "relative") || (PDMvt.type === "current")) {
                            let obj = {
                                year: pdy,
                                month: today.getMonth() + 1,
                                day: (PDDvt.offset === "monthend") ? 1 : pdd
                            };
                            let {
                                year: yy,
                                month: mm,
                                day: dd
                            } = changeMonth(obj, (PDMvt.type === "current") ? 0 : Number(PDMvt.offset));
                            pdy = yy;
                            pdm = mm;
                            pdd = (pdd === "monthend") ? daysInMonth(pdm, pdy) : dd;

                            pdresult = {
                                year: pdy,
                                month: pdm,
                                day: (PDDvt.offset === "monthend") ? daysInMonth(pdm, pdy) : pdd
                            };

                        } else if (PDMvt.type === "absolute") {
                            pdresult = {
                                year: pdy,
                                month: pdm,
                                day: (PDDvt.offset === "monthend") ? daysInMonth(pdm, pdy) : pdd
                            };

                        } else {
                            pdError = true;
                            resultWarning = errorWarningString(`Pivot date has 'day' as an absolute value. It must have 'month' and 'year' in. For relative 'day' such as 'day: "+1", it must not have 'month' or 'year' in. Even if you set 'month: "current"', that's sufficient. Pivot date will be set to today (the default).`, resultWarning);
                        }

                    } else if (PDYvt.type === "relative") {
                        if (isNumberSigned(PDYvt.offset)) {
                            if (Number(PDYvt.offset) > 500) {
                                resultWarning = errorWarningString(`'year' is a high number - ${PDYvt.offset}. Are you sure this is correct?.`, resultWarning);
                            }
                        }

                        if (PDMvt.type === "relative") {
                            let obj = {
                                year: pdy,
                                month: today.getMonth() + 1,
                                day: 1
                            };
                            let {
                                year: yy,
                                month: mm,
                                day: dd
                            } = changeMonth(obj, Number(PDMvt.offset));
                            pdy = yy;
                            pdm = mm;
                            pdd = (pdd === "monthend") ? daysInMonth(pdm, pdy) : dd;

                            pdresult = {
                                year: pdy,
                                month: pdm,
                                day: pdd
                            };

                        } else if (PDMvt.type === "absolute") {
                            pdresult = {
                                year: pdy,
                                month: pdm,
                                day: (PDDvt.offset === "monthend") ? daysInMonth(pdm, pdy) : pdd
                            };

                        } else {
                            pdError = true;
                            resultWarning = errorWarningString(`Pivot date has 'day' as an absolute value. It must have 'month' and 'year' in. For relative 'day' such as 'day: "+1", it must not have 'month' or 'year' in. Even if you set 'month: "current"', that's sufficient. Pivot date will be set to today (the default).`, resultWarning);
                        }
                    } else {
                        pdError = true;
                        resultWarning = errorWarningString(`Pivot date has 'day' as an absolute value. It must have 'month' and 'year' in. For relative 'day' such as 'day: "+1", it must not have 'month' or 'year' in. Even if you set 'month: "current"', that's sufficient. Pivot date will be set to today (the default).`, resultWarning);
                    }

                }


                if (pdError) {
                    pdresult = {
                        year: today.getFullYear(),
                        month: today.getMonth() + 1,
                        day: today.getDate()
                    };

                    pdy = today.getFullYear();
                    pdm = today.getMonth() + 1;
                    pdd = today.getDate();
                }

            } else {
                pdresult = {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                };
            }

        } else {
            pdresult = {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            };
        }



        if (isObjectEmpty(pdresult)) alert("pdresult empty");



        // ^RELATIVE DATE SETTINGS
        let Dvt = {},
            Wvt = {},
            Mvt = {},
            Yvt = {};
        let D, M, Y;

        let firstOfMonth;


        function resultsShow() {
            let maxDays = daysInMonth(Number(result.month), Number(result.year));

            if (maxDays < result.day) {
                resultError = errorWarningString(`The result has the month greater than the number of days in the month. ${JSON.stringify(result, null, 1)} has month ${JSON.stringify(result.month, null, 2)} which has ${maxDays} days in it. You can use 'monthend' as the 'day' value.`, resultError);
                result = {};
            }

            if ((resultWarning !== "") && ((!result.day) || (!result.month) || (!result.year))) {
                resultError = errorWarningString(`The result has the month greater than the number of days in the month.`, resultError);
                result = {};
            }


            if (!isObjectEmpty(result)) {

                if (Dvt.type === "current") {
                    // daily
                    if (Mvt.type) {
                        if (Mvt.type === "absolute") ;

                    }
                }
            }



            if (resultWarning !== "")
                console.log(`%cWARNING - ${resultWarning}`, 'color: blue; font-size: 16px');
            if (resultError !== "")
                console.error(`%cERROR - ${resultError}`, 'color: red; font-size: 16px');

            if (returnDate) {
                result = objToDate(result);
            }

            return result
        }





        // ^- General checks
        for (let prop of Object.keys(datesettings)) {
            if (!propertyList.includes(prop)) {
                resultError = errorWarningString(`${prop} is a property that must be one of these property names - ${propertyList.toString()}`, resultError);
                return resultsShow()
            }
        }


        // ^- A quick parse
        if (datesettings.day) {
            Dvt = valuetype(datesettings.day, "d");
            if (Dvt.type === "error") {
                resultError = errorWarningString(`'day' is invalid.`, resultError);
                return resultsShow()
            } else if (Dvt.type === "absolute") {
                if ((Number(Dvt.offset) < 1) || (Number(Dvt.offset) > 31)) {
                    resultError = errorWarningString("'day' is outside the range of less than 1 or greater than 31. You can't have 'day' outside of this range. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.", resultError);
                    return resultsShow()
                } else if (Dvt.offset > 28) {
                    // check D is not too high eg 29, use "end"
                    resultWarning = "'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.";
                }
            } else if (Dvt.type === "relative") {
                if (isNumberSigned(Dvt.offset)) {
                    if (Number(Dvt.offset) > 365) {
                        resultWarning = errorWarningString("'day' is a high number. Why don't you use years and/or months instead.", resultWarning);
                    }
                }
            }
        } else {
            resultError = errorWarningString("'day' property is empty. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.", resultError);
            return resultsShow()
        }


        if (datesettings.week) {
            Wvt = valuetype(datesettings.week, "w");
            if (Wvt.type === "error") {
                resultError = errorWarningString(`'week' is invalid.`, resultError);
                return resultsShow()
            } else if (Wvt.type === "absolute") {
                if ((Number(Wvt.offset) < 1) || (Number(Wvt.offset) > 53)) {
                    resultError = errorWarningString("'week' is less than 1 or greater than 53. You can't have 'week' outside of this range.", resultError);
                    return resultsShow()
                }
            } else if (Wvt.type === "relative") {
                if (isNumberSigned(Wvt.offset)) {
                    if (Number(Wvt.offset) > 53) {
                        resultWarning = errorWarningString("'week' is a high number. Why don't you use years and/or months instead.", resultWarning);
                    }
                }
            }
        }

        if (datesettings.month) {
            Mvt = valuetype(datesettings.month, "m");
            if (Mvt.type === "error") {
                resultError = errorWarningString(`'month' is invalid.`, resultError);
                return resultsShow()
            } else if (Mvt.type === "absolute") {
                if ((Number(Mvt.offset) < 1) || (Number(Mvt.offset) > 12)) {
                    resultError = errorWarningString("'month' is less than 1 or greater than 12. You can't have 'month' outside of this range.", resultError);
                    return resultsShow()
                }
                M = Number(Mvt.offset);
            } else if (Mvt.type === "current") {
                M = pdresult.month;
            } else if (Mvt.type === "relative") {
                if (isNumberSigned(Mvt.offset)) {
                    if (Number(Mvt.offset) > 48) {
                        resultWarning = errorWarningString("'month' is a high number. Why don't you use years and/or months instead.", resultWarning);
                    }
                }
            }

        } else {
            M = pdresult.month;
        }

        if (datesettings.year) {
            Yvt = valuetype(datesettings.year, "y");
            if (Yvt.type === "error") {
                resultError = errorWarningString(`'year' is invalid. 'year' isn't a number.`, resultError);
                return resultsShow()
            } else if (Yvt.type === "absolute") {
                if (!isYearValid(Yvt.offset, 1600, 2300)) {
                    resultError = errorWarningString(`'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`, resultError);
                    return resultsShow()
                }
            } else if (Yvt.type === "relative") {
                if (isNumberSigned(Yvt.offset)) {
                    if (Number(Yvt.offset) > 500) {
                        resultWarning = errorWarningString(`'year' is a high number - ${Yvt.offset}. Are you sure this is correct?.`, resultWarning);
                    }
                }
            }
        }


        if (datesettings.day) {
            D = Number(Dvt.offset);

            if (Dvt.type === "absolute") {
                if (datesettings.week) {
                    resultError = errorWarningString("'day' is set as an absolute number. You can't have any setting for 'week'. You can optionally have settings for 'month' and 'year', they must be absolute ie a specific number, but not for 'week'.", resultError);
                    return resultsShow()
                }

                Y = yearoffset(Yvt, pdresult.year);

                if (Mvt.type === "relative") {
                    let obj = {
                        year: (Y) ? Y : pdresult.year,
                        month: pdresult.month,
                        day: (Dvt.offset === "monthend") ? 1 : D
                    };
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, Number(Mvt.offset));
                    Y = yy;
                    M = mm;
                    D = (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D;

                    result = {
                        year: Y,
                        month: M,
                        day: D
                    };
                    return resultsShow()
                } else {
                    result = {
                        year: Y,
                        month: M,
                        day: (Dvt.offset === "monthend") ? daysInMonth(M, Y) : D
                    };
                    return resultsShow()
                }


            } else if (Dvt.type === "relative") {
                if (!isObjectEmpty(Wvt) || !isObjectEmpty(Mvt) || !isObjectEmpty(Yvt)) {
                    resultError = errorWarningString("'day' is relative. You can't have 'week', 'month' or 'year' settings. Eg if it's tomorrow (day: -1), you can't set week, month or year.", resultError);
                    return resultsShow()
                }

                result = changeDay({
                    year: pdresult.year,
                    month: pdresult.month,
                    day: pdresult.day
                }, DAY_MS * Number(Dvt.offset));
                return resultsShow()


            } else if (Dvt.type === "current") {


                resultWarning = errorWarningString(`'day' is set to 'current'. If you run this frequently, and if the day is 29, 30 or 31 and you are adding 1 month, some months may not have 31 or 30 days in them so you will get an error with a blank result. You can use 'day: "+30" or 'week: "+4"'.`, resultWarning);

                Y = yearoffset(Yvt, pdresult.year);

                if (Mvt.type === "relative") {
                    let obj = {
                        year: (Y) ? Y : pdresult.year,
                        month: pdresult.month,
                        day: pdresult.day
                    };
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, Number(Mvt.offset));
                    Y = yy;
                    M = mm;
                    D = dd;

                    result = {
                        year: Y,
                        month: M,
                        day: D
                    };
                    return resultsShow()

                } else {
                    result = {
                        year: Y,
                        month: M,
                        day: pdresult.day
                    };
                    return resultsShow()
                }



            } else if (Dvt.type === "dayofweek") {
                Y = yearoffset(Yvt, pdresult.year);

                if (Mvt.type === "relative") {
                    let obj = {
                        year: (Y) ? Y : pdresult.year,
                        month: pdresult.month,
                        day: pdresult.day
                    };
                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, Number(Mvt.offset));
                    Y = yy;
                    M = mm;
                    D = dd;
                }


                firstOfMonth = {
                    year: Y,
                    month: M,
                    day: 1
                };

                let monthcurrent = {
                    year: Y,
                    month: M,
                    day: pdresult.day
                };


                // day of week with Week number, it's next node is Month
                // { day: "Monday", week: 2 } means every month, Monday
                // of the 2nd week of each month

                if (Wvt.type === "absolute") {
                    Number(Wvt.offset);

                    let diff = sameWeekCountDays(dateToDay(firstOfMonth), Dvt.offset, startOfWeek) + ((Number(Wvt.offset) - 1) * 7);

                    result = changeDay(firstOfMonth, diff * DAY_MS);
                    return resultsShow()

                } else if ((Wvt.type === "current") || (!Wvt.type)) {

                    let diff = sameWeekCountDays(dateToDay(monthcurrent), Dvt.offset, startOfWeek);

                    result = changeDay(monthcurrent, diff * DAY_MS);
                    return resultsShow()

                } else if (Wvt.type === "relative") {
                    let diff = sameWeekCountDays(dateToDay(monthcurrent), Dvt.offset, startOfWeek) + ((Number(Wvt.offset)) * 7);

                    result = changeDay(monthcurrent, diff * DAY_MS);
                    return resultsShow()
                }


            } else if (Dvt.type === "dayofweek weeknum") {
                if (!isObjectEmpty(Wvt)) {
                    resultError = errorWarningString("'day' is a dayname with a number eg 'Sunday 2', but it means 2nd Sunday of each month, it can't have a 'week' setting.", resultError);
                    return resultsShow()
                }

                Y = yearoffset(Yvt, pdresult.year);

                if (Mvt.type === "relative") {
                    let obj = {
                        year: (Y) ? Y : pdresult.year,
                        month: pdresult.month,
                        day: pdresult.day
                    };

                    let {
                        year: yy,
                        month: mm,
                        day: dd
                    } = changeMonth(obj, Number(Mvt.offset));
                    Y = yy;
                    M = mm;
                    D = dd;
                }

                firstOfMonth = {
                    year: Y,
                    month: M,
                    day: 1
                };
                let lastOfMonth = {
                    year: Y,
                    month: M,
                    day: daysInMonth(M, Y)
                };

                if (!/^\*?-?\d{1,1}$/.test(Dvt.offset[1])) {
                    resultError = errorWarningString(`'day' is in an incorrect format. It must be something like 'day: "Monday 2"' (2nd Monday of the month), 'day: "tue -1"' (Last Tuesday of the month), 'day: "Friday *2"' (2nd Friday of the month only counting full weeks) or 'day: "Monday *-2"' (2nd last Monday of the month only counting full weeks). The number must be less than 5.`, resultError);
                    return resultsShow()
                }

                if (Dvt.offset[1][0] === "*") {
                    if (Math.abs(Number(Dvt.offset[1].slice(1))) >= 4) {
                        resultWarning = errorWarningString(`There are maximum 4 full weeks in a month. Weekdays in the later part of the week for full weeks as you specified don't always occur so you may get a blank result. Instead of opting for the 4th occurrence of a day, you can opt for the last eg 'day: "Friday -1"' or 'day: "Sunday *-1"'`, resultWarning);
                    }
                    if (Number(Dvt.offset[1].slice(1)) > 0) {
                        result = weekFullFirst(firstOfMonth, Number(Dvt.offset[0]), Number(Dvt.offset[1].slice(1)), startOfWeek);
                        return resultsShow()
                    } else {
                        result = weekFullLast(lastOfMonth, Number(Dvt.offset[0]), Math.abs(Number(Dvt.offset[1].slice(1))), startOfWeek);
                        return resultsShow()
                    }
                } else {
                    if (Number(Dvt.offset[1]) > 0) {
                        result = weekFirst(firstOfMonth, Number(Dvt.offset[0]), Number(Dvt.offset[1]), startOfWeek);
                        return resultsShow()
                    } else {
                        result = weekLast(lastOfMonth, Number(Dvt.offset[0]), Math.abs(Number(Dvt.offset[1])), startOfWeek);
                        return resultsShow()
                    }
                }


            } else {
                // nothing entered, return current day
                result = {
                    year: pdresult.year,
                    month: pdresult.month,
                    day: pdresult.day
                };
                resultError = errorWarningString("'day' property has no value. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.", resultError);
                return resultsShow()
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

    }


    function valuetype(str, datetype) {
        let val = String(str).trim();

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
                let part1 = "";
                let part2 = "";
                let seperator = val.indexOf(" ");

                if (seperator === -1) {
                    part1 = val;
                } else {
                    part1 = val.slice(0, seperator);
                    part2 = val.slice(seperator + 1);
                }

                if (part1.length === 3) {
                    let daynumber = dayToNumberThreeLetter(part1);
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
                    let daynumber = dayToNumber(part1);
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


    function loop(datesettings, pivotdate, opts) {
        opts = opts || {};
        opts.startOfWeek || 1;
        let datesBefore = opts.datesBefore;
        let datesAfter = opts.datesAfter;
        let returnDate = (opts.returnDate !== undefined) ? Boolean(opts.returnDate) : true;

        let arr = [];
        let arrnew = [];

        let iterate = iteration(datesettings, pivotdate, opts);

        if (returnDate) {
            iterate = dateToObj(iterate);
        }

        if (isObjectEmpty(iterate)) {
            return []
        }

        let Dvt = {},
            Mvt = {},
            Yvt = {};

        Dvt = valuetype(datesettings.day, "d");
        Mvt = valuetype(datesettings.month, "m");
        Yvt = valuetype(datesettings.year, "y");


        let zeroiterator = iteration(datesettings, pivotdate, opts);
        if (returnDate) {
            zeroiterator = dateToObj(zeroiterator);
        }

        let startbase = iterate;

        for (let i = 0; i < datesBefore; i++) {
            if (Dvt.type.slice(0, 9) === "dayofweek") {
                iterate = iteration(datesettings, occurrences(datesettings, iterate, -1, Dvt, Mvt, Yvt), opts);
            } else {
                iterate = occurrences(datesettings, iterate, -1, Dvt, Mvt, Yvt);
            }

            if (returnDate) {
                arr.push(objToDate(iterate));
            } else {
                arr.push(iterate);
            }
        }

        arrnew = arr.reverse();

        if (returnDate) {
            arrnew.push(objToDate(zeroiterator));
        } else {
            arrnew.push(zeroiterator);
        }



        iterate = startbase;
        for (let i = 0; i < datesAfter; i++) {
            if (Dvt.type.slice(0, 9) === "dayofweek") {
                iterate = iteration(datesettings, occurrences(datesettings, iterate, 1, Dvt, Mvt, Yvt), opts);
            } else {
                iterate = occurrences(datesettings, iterate, 1, Dvt, Mvt, Yvt);
            }

            if (returnDate) {
                arr.push(objToDate(iterate));
            } else {
                arr.push(iterate);
            }
        }

        return arrnew



        function occurrences(datesettings, pivotdate, forwardbackwards, Dvt, Mvt, Yvt, startofweek) {

            let Y = (!datesettings.year) ? pivotdate.year : datesettings.year;
            let M = (!datesettings.month) ? pivotdate.month : datesettings.month;

            // Find out how far we need to increment or decrement
            // { day: 15 } is monthly, { day: 8, week: 2 } is monthly
            // { day: 1, month: 2 } is yearly
            // { day: "-90" } is daily
            if ((Dvt.type === "relative") || (Dvt.type === "current")) {
                return changeDay(pivotdate, DAY_MS * forwardbackwards)

            } else if (Dvt.type === "dayofweek") {
                if (datesettings.month) {
                    return {
                        year: Y + (1 * forwardbackwards),
                        month: M,
                        day: datesettings.day
                    }
                } else {
                    // If month is missing, change it by a week ie 7 days
                    return changeDay(pivotdate, 7 * DAY_MS * forwardbackwards)
                }

            } else if (Dvt.type === "dayofweek weeknum") {
                // Use the first day of the month and run an iteration
                if (datesettings.month) {
                    return {
                        year: Y + (1 * forwardbackwards),
                        month: M,
                        day: 1
                    }
                } else {
                    let next = changeMonth(pivotdate, 1 * forwardbackwards);
                    // If month is missing, change it by a month and do an iteration
                    // return changeDay(pivotdate, 7 * DAY_MS * forwardbackwards)
                    return {
                        year: next.year,
                        month: next.month,
                        day: 1
                    }

                }




            } else if ((Mvt.type === "relative") || (Mvt.type === "current")) {
                return changeMonth(pivotdate, forwardbackwards)

            } else if ((Yvt.type === "relative") || (Yvt.type === "current")) {
                if (datesettings.month) {
                    if (Mvt.type === "absolute") {
                        // month is absolute
                        return {
                            year: Y + (1 * forwardbackwards),
                            month: M,
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
                                year: Y + (1 * forwardbackwards),
                                month: M,
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

    }


    // Weeks in a month that start off with the set startofweek eg Monday
    // The first one it counts as 1,
    // It finds the daynumber, weeknum combination eg Sunday 3
    // is 0, 3. It would find the 3rd Sunday of the month only counting
    // Sundays that are in a full week where the specified week start
    // starts in that month, not the previous month
    // Returns the date object
    function weekFullFirst(dateobj, daynumber, weeknum, startofweek = 1) {
        let startoffirstfullweek = nextDayName(dateToDay(dateobj), startofweek);
        let todaynumber = nextDayName(startofweek, daynumber);
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
        let startoflastweeknotfull = nextDayName(dateToDay(dateobj), startofweek, false);
        let startoflastfullweek = startoflastweeknotfull + 7;

        let lastdayinfullweek = nextDayName(startofweek, daynumber);

        return {
            day: dateobj.day - startoflastfullweek + lastdayinfullweek - ((Number(weeknum) - 1) * 7),
            month: dateobj.month,
            year: dateobj.year
        }
    }


    function weekFirst(dateobj, daynumber, weeknum, startofweek = 1) {
        let firstofmonthdaynumber = dateToDay(dateobj);
        let firstfoundoffset = nextDayName(firstofmonthdaynumber, daynumber);

        return {
            day: 1 + firstfoundoffset + ((Number(weeknum) - 1) * 7),
            month: dateobj.month,
            year: dateobj.year
        }
    }

    function weekLast(dateobj, daynumber, weeknum, startofweek = 1) {
        let lastofmonthdaynumber = dateToDay(dateobj);
        // move backwards to find the daynumber from the last day of the month
        let firstfoundoffset = nextDayName(lastofmonthdaynumber, daynumber, false);

        return {
            day: dateobj.day - firstfoundoffset - ((Number(weeknum) - 1) * 7),
            month: dateobj.month,
            year: dateobj.year
        }

    }


    // convert a Blue Moon date object to a javascript Date
    // it returns in the local time it is run on
    function objToDate(obj) {
        return new Date(obj.year, obj.month - 1, obj.day, 0, 0, 0, 0)
    }

    function dateToObj(dt) {
        return {
            year: dt.getFullYear(),
            month: dt.getMonth() + 1,
            day: dt.getDate()
        }
        // return new Date(obj.year, obj.month - 1, obj.day, 12, 0, 0, 0)
    }

    return BlueMoon;

})();
