(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
    global.BlueMoon = factory());
})(this, (function() {
    "use strict";
    function isObjectPlain(obj) {
        return obj === null ? false : obj === undefined ? false : Object.prototype.toString.call(obj) === "[object Object]";
    }
    function isObjectEmpty(value) {
        return Object.prototype.toString.call(value) === "[object Object]" && JSON.stringify(value) === "{}";
    }
    const daysNameList = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    function dayToNumber(dayname) {
        return daysNameList.findIndex((day => day.toLowerCase() === dayname.toLowerCase()));
    }
    function dayToNumberThreeLetter(daynamethreeletter) {
        return daysNameList.findIndex((day => day.slice(0, 3).toLowerCase() === daynamethreeletter.toLowerCase()));
    }
    const DAY_MS = 864e5;
    function isYearValid(year, minyear, maxyear) {
        let text = /^\d{4}$/;
        let y = Number(year);
        if (y !== 0) {
            if (y !== "" && !text.test(y)) {
                return false;
            }
            if (String(y).length !== 4) return false;
            if (minyear && maxyear) {
                if (y < minyear || y > maxyear) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    function daysInMonth(month, year) {
        const days = [ 31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        return days[month - 1];
    }
    function changeDay(dateobj, ms) {
        let d;
        if (Object.prototype.toString.call(dateobj) !== "[object Object]") {
            d = {
                day: dateobj.getDate(),
                month: dateobj.getMonth() + 1,
                year: dateobj.getFullYear()
            };
        } else {
            d = dateobj;
        }
        let dt = new Date(Date.UTC(d.year, d.month - 1, d.day, 12, 0, 0, 0));
        let dt2 = new Date(dt.valueOf() + ms);
        return {
            year: dt2.getUTCFullYear(),
            month: dt2.getUTCMonth() + 1,
            day: dt2.getUTCDate()
        };
    }
    function changeMonth(dateobj, months, checkForMaxDays = false) {
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
        if (checkForMaxDays) {
            let maxDays = daysInMonth(Number(result.month), Number(result.year));
            if (Number(dateobj.day) <= maxDays) {
                return result;
            } else {
                result.day = Number(dateobj.day) - maxDays;
                result.month += 1;
                return result;
            }
        } else {
            return result;
        }
    }
    function changeYear(dateobj, years) {
        if (dateobj.day > 28 && dateobj.month === 2) {
            let currentYearLeepYear = isLeapYear(dateobj.year);
            if (currentYearLeepYear !== isLeapYear(dateobj.year + years)) {
                return {
                    day: 1,
                    month: 3,
                    year: dateobj.year + years
                };
            }
        }
        return {
            day: dateobj.day,
            month: dateobj.month,
            year: dateobj.year + years
        };
    }
    function sameWeekCountDays(daynumberfrom, daynumberto, startofweek = 1) {
        if (daynumberfrom === daynumberto) {
            return 0;
        } else if (daynumberfrom >= startofweek && daynumberto >= startofweek) {
            return daynumberto - daynumberfrom;
        } else {
            let df = daynumberfrom < startofweek ? daynumberfrom + 7 : daynumberfrom;
            let dt = daynumberto < startofweek ? daynumberto + 7 : daynumberto;
            return dt - df;
        }
    }
    function isNumber(char) {
        return /^\d+$/.test(char);
    }
    function isNumberSigned(char) {
        return /^[+|-]\d+$/.test(char);
    }
    function dayOfTheWeek(day, month, year) {
        if (month < 3) {
            year--;
            month += 12;
        }
        const yearDigits = year % 100;
        const century = Math.floor(year / 100);
        const weekDay = (day + Math.floor((month + 1) * 2.6) + yearDigits + Math.floor(yearDigits / 4) + Math.floor(century / 4) + 5 * century) % 7;
        return weekDay === 0 ? 6 : weekDay - 1;
    }
    function errorWarningString(msg, str) {
        return str ? str + "\n" + msg : msg;
    }
    /** @license
	 *  ----------------------------------------------------------------------------
	 *  Blue Moon Date API - <https://github.com/chrisjwaddell/blue-moon>
	 *  Licensed under MIT
	 *  Copyright Chris Waddell
	 *  ----------------------------------------------------------------------------
	 */    function BlueMoon(datesettings) {
        let settings = datesettings || {};
        settings.pivotDate = settings.pivotDate ?? {};
        settings.resultAsDateObject = settings.resultAsDateObject ?? false;
        settings.startOfWeek = settings.startOfWeek ?? 1;
        settings.warnings = settings.warnings ?? true;
        let today = new Date;
        let pivd = settings.pivotDate;
        if (isObjectEmpty(pivd)) {
            pivd = dateToObj(today);
        }
        const invalidDate = () => new Date("");
        const showMsg = (msg, errorMsg) => {
            if (settings.warnings && !errorMsg || errorMsg) {
                console.log(`%c` + (errorMsg ? "ERROR" : "WARNING") + ` - ${msg}`, "color: " + (errorMsg ? "red" : "blue") + "; font-size: 16px");
            }
        };
        let result = {};
        let dsCheck = datePropertiesAndChecks(datesettings, true);
        if (dsCheck.TypeErrors !== "") {
            showMsg(dsCheck.TypeErrors, true);
            return invalidDate();
        }
        if (dsCheck.errors !== "") {
            showMsg(dsCheck.errors, true);
            return invalidDate();
        }
        let pdCheck = datePropertiesAndChecks(pivd, false);
        if (pdCheck.TypeErrors !== "") {
            showMsg(pdCheck.TypeErrors, true);
            return invalidDate();
        }
        if (pdCheck.errors !== "") {
            showMsg(pdCheck.errors, true);
            return invalidDate();
        }
        if (dsCheck.warnings !== "") {
            showMsg(dsCheck.warnings, false);
        }
        if (pdCheck.warnings !== "") {
            showMsg(pdCheck.warnings, false);
        }
        let pdtemp = dateDWMY(pdCheck.D, {}, pdCheck.M, pdCheck.Y, dateToObj(today), {});
        if (Object.prototype.hasOwnProperty.call(settings, "loop")) {
            return loopResults();
        } else {
            let res = dateDWMY(dsCheck.D, dsCheck.W, dsCheck.M, dsCheck.Y, pdtemp, settings);
            return settings.resultAsDateObject ? objToDate(res) : res;
        }
        function loopResults() {
            let dType = dsCheck.D.type;
            let incrementLoop = "d";
            let arrLoop = [];
            switch (dType) {
              case "current":
                incrementLoop = "d";
                break;

              case "relative":
                incrementLoop = "d";
                break;

              case "dayofweek":
                if (datesettings.week) {
                    incrementLoop = "y";
                } else {
                    incrementLoop = "w";
                }
                break;

              case "absolute":
                if (datesettings.month) {
                    incrementLoop = "y";
                } else {
                    incrementLoop = "m";
                }
                break;

              case "dayofweek weeknum":
                if (datesettings.month) {
                    incrementLoop = "y";
                } else {
                    incrementLoop = "m";
                }
                break;
            }
            arrLoop.push(pdtemp);
            let newpivd = pdtemp;
            for (let i = 0; i < Math.abs(settings.loop) - 1; i += 1) {
                switch (incrementLoop) {
                  case "d":
                    if (newpivd.day < 28 && settings.loop > 0) {
                        newpivd = {
                            day: newpivd.day + 1,
                            month: newpivd.month,
                            year: newpivd.year
                        };
                    } else if (newpivd.day > 1 && settings.loop < 0) {
                        newpivd = {
                            day: newpivd.day - 1,
                            month: newpivd.month,
                            year: newpivd.year
                        };
                    } else {
                        settings.loop > 0 ? newpivd = changeDay(newpivd, DAY_MS * 1) : newpivd = changeDay(newpivd, DAY_MS * -1);
                    }
                    break;

                  case "w":
                    settings.loop > 0 ? newpivd = changeDay(newpivd, DAY_MS * 7) : newpivd = changeDay(newpivd, DAY_MS * -7);
                    break;

                  case "m":
                    if (newpivd.month < 12 && settings.loop > 0) {
                        newpivd = {
                            day: newpivd.day,
                            month: newpivd.month + 1,
                            year: newpivd.year
                        };
                    } else if (newpivd.month > 1 && settings.loop < 0) {
                        newpivd = {
                            day: newpivd.day,
                            month: newpivd.month - 1,
                            year: newpivd.year
                        };
                    } else {
                        settings.loop > 0 ? newpivd = changeMonth(newpivd, 1, true) : newpivd = changeMonth(newpivd, -1, true);
                    }
                    break;

                  case "y":
                    settings.loop > 0 ? newpivd = changeYear(newpivd, 1) : newpivd = changeYear(newpivd, -1);
                    break;
                }
                arrLoop.push(newpivd);
            }
            let arrResult = [];
            if (!settings.resultAsDateObject) {
                arrResult = arrLoop.map((cv => dateDWMY(dsCheck.D, dsCheck.W, dsCheck.M, dsCheck.Y, cv, settings)));
            } else {
                arrResult = arrLoop.map((cv => objToDate(dateDWMY(dsCheck.D, dsCheck.W, dsCheck.M, dsCheck.Y, cv, settings))));
            }
            return arrResult;
        }
        function valuetype(str, datetype) {
            let val = String(str).trim();
            if (isNumber(val)) {
                return {
                    type: "absolute",
                    offset: Number(val)
                };
            } else if (isNumberSigned(val)) {
                return {
                    type: "relative",
                    offset: val
                };
            } else {
                if (val === "current") {
                    return {
                        type: "current",
                        offset: val
                    };
                } else if (val === "monthend" && (datetype === "d" || datetype === "pd-d")) {
                    return {
                        type: "absolute",
                        offset: val
                    };
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
                                };
                            } else {
                                return {
                                    type: "dayofweek weeknum",
                                    offset: {
                                        0: daynumber,
                                        1: part2
                                    }
                                };
                            }
                        } else {
                            return {
                                type: "error",
                                offset: part1
                            };
                        }
                    } else {
                        let daynumber = dayToNumber(part1);
                        if (daynumber !== -1) {
                            if (seperator === -1) {
                                return {
                                    type: "dayofweek",
                                    offset: daynumber
                                };
                            } else {
                                return {
                                    type: "dayofweek weeknum",
                                    offset: {
                                        0: daynumber,
                                        1: part2
                                    }
                                };
                            }
                        } else {
                            return {
                                type: "error",
                                offset: part1
                            };
                        }
                    }
                } else {
                    return {
                        type: "error",
                        offset: "error"
                    };
                }
            }
        }
        function dateDWMY(d, w, m, y, pivotdate, settings) {
            if (d.type === "absolute" || d.type === "current") {
                return dAbsOrCur();
            } else if (d.type === "relative") {
                result = changeDay({
                    year: pivotdate.year,
                    month: pivotdate.month,
                    day: pivotdate.day
                }, DAY_MS * Number(d.offset));
                return result;
            } else if (d.type === "dayofweek") {
                result = dDayOfWeek();
                return result;
            } else if (d.type === "dayofweek weeknum") {
                result = dDayofweekWeeknum();
                return result;
            }
            function dAbsOrCur() {
                let wmy = (w && !isObjectEmpty(w) ? "Y" : "N") + (m && !isObjectEmpty(m) ? "Y" : "N") + (y && !isObjectEmpty(y) ? "Y" : "N");
                let yy, mm;
                let obj = {}, next = {};
                switch (wmy) {
                  case "NYY":
                    if (m.type === "absolute" || m.type === "current") {
                        mm = absOrCur(m, "m", pivotdate);
                        if (y.type === "absolute" || y.type === "current") {
                            yy = absOrCur(y, "y", pivotdate);
                        } else if (y.type === "relative") {
                            yy = pivotdate.year + Number(y.offset);
                        }
                        obj = {
                            year: yy,
                            month: mm,
                            day: dOrMonthEnd({
                                type: "absolute",
                                offset: absOrCur(d, "d", pivotdate)
                            }, mm, yy)
                        };
                        return obj;
                    } else {
                        if (y.type === "absolute" || y.type === "current") {
                            yy = absOrCur(y, "y", pivotdate);
                            mm = pivotdate.month;
                            obj = {
                                year: yy,
                                month: mm,
                                day: dOrMonthEnd(d, mm, yy)
                            };
                            if (m.type === "relative") {
                                next = changeMonth(obj, Number(m.offset), false);
                                return {
                                    year: next.year,
                                    month: next.month,
                                    day: dOrMonthEnd({
                                        type: "absolute",
                                        offset: absOrCur(d, "d", pivotdate)
                                    }, next.month, next.year)
                                };
                            } else {
                                return {};
                            }
                        } else {
                            if (m.type === "relative") {
                                if (y.type === "relative") {
                                    yy = pivotdate.year + Number(y.offset);
                                    mm = pivotdate.month;
                                    obj = {
                                        year: yy,
                                        month: mm,
                                        day: dOrMonthEnd(d, mm, yy)
                                    };
                                    next = changeMonth(obj, Number(m.offset), false);
                                    return {
                                        year: next.year,
                                        month: next.month,
                                        day: dOrMonthEnd({
                                            type: "absolute",
                                            offset: absOrCur(d, "d", pivotdate)
                                        }, next.month, next.year)
                                    };
                                }
                            }
                        }
                    }
                    break;

                  case "NNY":
                    if (y.type === "absolute" || y.type === "current") {
                        yy = absOrCur(y, "y", pivotdate);
                    } else if (y.type === "relative") {
                        yy = pivotdate.year + Number(y.offset);
                    }
                    mm = pivotdate.month;
                    obj = {
                        year: yy,
                        month: mm,
                        day: dOrMonthEnd({
                            type: "absolute",
                            offset: absOrCur(d, "d", pivotdate)
                        }, mm, yy)
                    };
                    return obj;

                  case "NNN":
                    yy = pivotdate.year;
                    mm = pivotdate.month;
                    obj = {
                        year: pivotdate.year,
                        month: pivotdate.month,
                        day: dOrMonthEnd({
                            type: "absolute",
                            offset: absOrCur(d, "d", pivotdate)
                        }, mm, yy)
                    };
                    return obj;

                  case "NYN":
                    yy = pivotdate.year;
                    if (m.type === "absolute" || m.type === "current") {
                        mm = absOrCur(m, "m", pivotdate);
                        obj = {
                            year: yy,
                            month: absOrCur(m, "m", pivotdate),
                            day: dOrMonthEnd({
                                type: "absolute",
                                offset: absOrCur(d, "d", pivotdate)
                            }, mm, yy)
                        };
                        return obj;
                    } else if (m.type === "relative") {
                        yy = pivotdate.year;
                        mm = pivotdate.month;
                        obj = {
                            year: yy,
                            month: mm,
                            day: dOrMonthEnd({
                                type: "absolute",
                                offset: absOrCur(d, "d", pivotdate)
                            }, mm, yy)
                        };
                        next = changeMonth(obj, Number(m.offset), false);
                        return {
                            year: next.year,
                            month: next.month,
                            day: dOrMonthEnd({
                                type: "absolute",
                                offset: absOrCur(d, "d", pivotdate)
                            }, next.month, next.year)
                        };
                    }
                    break;
                }
            }
            function dDayOfWeek() {
                let wmy = (w && !isObjectEmpty(w) ? "Y" : "N") + (m && !isObjectEmpty(m) ? "Y" : "N") + (y && !isObjectEmpty(y) ? "Y" : "N");
                let baseDate;
                switch (wmy) {
                  case "NNN":
                    baseDate = pivotdate;
                    break;

                  case "NNY":
                    if (y.type === "absolute") {
                        baseDate = {
                            year: Number(y.offset),
                            month: pivotdate.month,
                            day: pivotdate.day
                        };
                    } else if (y.type === "current") {
                        baseDate = pivotdate;
                    } else if (y.type === "relative") {
                        baseDate = {
                            year: pivotdate.year + Number(y.offset),
                            month: pivotdate.month,
                            day: pivotdate.day
                        };
                    }
                    break;

                  case "YNN":
                    if (w.type === "absolute") {
                        let relativeWeek = changeDay({
                            day: 1,
                            month: 1,
                            year: pivotdate.year
                        }, DAY_MS * Number(w.offset) * 7);
                        baseDate = relativeWeek;
                    } else if (w.type === "current") {
                        baseDate = pivotdate;
                    } else if (w.type === "relative") {
                        let relativeWeek = changeDay(pivotdate, DAY_MS * Number(w.offset) * 7);
                        baseDate = relativeWeek;
                    }
                    break;

                  case "YNY":
                    if (w.type === "absolute") {
                        if (y.type === "absolute") {
                            let relativeWeek = changeDay({
                                day: 1,
                                month: 1,
                                year: Number(y.offset)
                            }, DAY_MS * Number(w.offset) * 7);
                            baseDate = relativeWeek;
                        } else if (y.type === "current") {
                            let relativeWeek = changeDay({
                                day: 1,
                                month: 1,
                                year: pivotdate.year
                            }, DAY_MS * Number(w.offset) * 7);
                            baseDate = relativeWeek;
                        } else if (y.type === "relative") {
                            baseDate = changeDay({
                                day: 1,
                                month: 1,
                                year: pivotdate.year + Number(y.offset)
                            }, DAY_MS * Number(w.offset) * 7);
                        }
                    } else if (w.type === "current") {
                        if (y.type === "absolute") {
                            baseDate = {
                                day: pivotdate.day,
                                month: pivotdate.month,
                                year: Number(y.offset)
                            };
                        } else if (y.type === "current") {
                            baseDate = pivotdate;
                        } else if (y.type === "relative") {
                            baseDate = {
                                day: pivotdate.day,
                                month: pivotdate.month,
                                year: pivotdate.year + Number(y.offset)
                            };
                        }
                    } else if (w.type === "relative") {
                        if (y.type === "absolute") {
                            baseDate = changeDay({
                                day: pivotdate.day,
                                month: pivotdate.month,
                                year: Number(y.offset)
                            }, DAY_MS * Number(w.offset) * 7);
                        } else if (y.type === "current") {
                            baseDate = changeDay(pivotdate, DAY_MS * Number(w.offset) * 7);
                        } else if (y.type === "relative") {
                            baseDate = changeDay({
                                day: pivotdate.day,
                                month: pivotdate.month,
                                year: pivotdate.year + Number(y.offset)
                            }, DAY_MS * Number(w.offset) * 7);
                        }
                    }
                    break;
                }
                let dayMove = sameWeekCountDays(dayOfTheWeek(baseDate.day, baseDate.month, baseDate.year), Number(d.offset), settings.startOfWeek);
                return changeDay(baseDate, DAY_MS * dayMove);
            }
            function dDayofweekWeeknum() {
                let wmy = (w && !isObjectEmpty(w) ? "Y" : "N") + (m && !isObjectEmpty(m) ? "Y" : "N") + (y && !isObjectEmpty(y) ? "Y" : "N");
                let yy, mm;
                let fullWeek = d.offset[1].includes("*");
                switch (wmy) {
                  case "NNN":
                    return dayOccurrenceInMonth(d.offset[0], Number.parseInt(d.offset[1].replace("*", "")), pivotdate.month, pivotdate.year, fullWeek, settings.startOfWeek);

                  case "NNY":
                    if (y.type === "absolute") {
                        yy = Number(y.offset);
                    } else if (y.type === "current") {
                        yy = pivotdate.year;
                    } else if (y.type === "relative") {
                        yy = pivotdate.year + Number(y.offset);
                    }
                    return dayOccurrenceInMonth(d.offset[0], Number.parseInt(d.offset[1].replace("*", "")), pivotdate.month, yy, fullWeek, settings.startOfWeek);

                  case "NYN":
                    if (m.type === "absolute") {
                        mm = Number(m.offset);
                    } else if (m.type === "current") {
                        mm = pivotdate.month;
                    } else if (m.type === "relative") {
                        mm = pivotdate.month + Number(m.offset);
                    }
                    return dayOccurrenceInMonth(d.offset[0], Number.parseInt(d.offset[1].replace("*", "")), mm, pivotdate.year, fullWeek, settings.startOfWeek);

                  case "NYY":
                    if (y.type === "absolute") {
                        yy = Number(y.offset);
                    } else if (y.type === "current") {
                        yy = pivotdate.year;
                    } else if (y.type === "relative") {
                        yy = pivotdate.year + Number(y.offset);
                    }
                    if (m.type === "absolute") {
                        mm = Number(m.offset);
                    } else if (m.type === "current") {
                        mm = pivotdate.month;
                    } else if (m.type === "relative") {
                        mm = pivotdate.month + Number(m.offset);
                    }
                    return dayOccurrenceInMonth(d.offset[0], Number.parseInt(d.offset[1].replace("*", "")), mm, yy, fullWeek, settings.startOfWeek);
                }
            }
        }
        function dOrMonthEnd(vt, m, y) {
            return vt.offset === "monthend" ? daysInMonth(m, y) : Number(vt.offset);
        }
        function absOrCur(vt, type, pivotdate) {
            switch (type) {
              case "d":
                return vt.type === "current" ? pivotdate.day : vt.offset;

              case "m":
                return vt.type === "current" ? pivotdate.month : Number(vt.offset);

              case "y":
                return vt.type === "current" ? pivotdate.year : Number(vt.offset);
            }
        }
        function objToDate(obj) {
            return new Date(obj.year, obj.month - 1, obj.day, 0, 0, 0, 0);
        }
        function dateToObj(dt) {
            return {
                year: dt.getFullYear(),
                month: dt.getMonth() + 1,
                day: dt.getDate()
            };
        }
        function sameWeekFromTo(cur, dest, startOfWeek = 1) {
            if (cur === dest) return 0;
            if (startOfWeek > cur && startOfWeek > dest || cur > startOfWeek && dest > startOfWeek) return dest - cur;
            if (startOfWeek === cur) {
                if (startOfWeek > dest) {
                    return 7 - dest - 1;
                } else {
                    return dest - cur;
                }
            }
            if (startOfWeek === dest) {
                if (startOfWeek > cur) {
                    return dest - cur - 7;
                } else {
                    return dest - cur;
                }
            }
            if (startOfWeek > cur) {
                if (dest > startOfWeek) {
                    return dest - cur - 7;
                }
            }
            if (cur > startOfWeek) {
                if (startOfWeek > dest) {
                    return 7 - (cur - dest);
                }
            }
        }
        function dayOccurrenceInMonth(destDayNumber, occurrenceOfDay, month, year, fullWeek = false, startOfWeek = 1) {
            let dayFinal;
            let moveDays = 0;
            let firstOccurrence = 0;
            if (occurrenceOfDay > 0) {
                let cur = dayOfTheWeek(1, month, year);
                moveDays = sameWeekFromTo(cur, destDayNumber, startOfWeek);
                firstOccurrence = 0;
                if (fullWeek) {
                    let startOfFirstFullWeek = sameWeekFromTo(cur, startOfWeek, startOfWeek);
                    startOfFirstFullWeek = startOfFirstFullWeek === 0 ? 0 : 7 + sameWeekFromTo(cur, startOfWeek, startOfWeek);
                    firstOccurrence = startOfFirstFullWeek + sameWeekFromTo(startOfWeek, destDayNumber, startOfWeek);
                } else {
                    firstOccurrence = moveDays < 0 ? moveDays + 7 : moveDays;
                }
                dayFinal = firstOccurrence + 7 * (occurrenceOfDay - 1) + 1;
            } else if (occurrenceOfDay < 0) {
                let lastDay = daysInMonth(month, year);
                moveDays = sameWeekCountDays(dayOfTheWeek(lastDay, month, year), destDayNumber, startOfWeek);
                firstOccurrence = moveDays > 0 ? moveDays - 7 : moveDays;
                dayFinal = lastDay + firstOccurrence - (Math.abs(occurrenceOfDay) - 1) * 7;
            }
            return dayFinal > daysInMonth(month, year) ? invalidDate() : {
                day: dayFinal,
                month: month,
                year: year
            };
        }
        function datePropertiesAndChecks(dateObject, ds) {
            const propertyList = [ "day", "week", "month", "year", "pivotDate", "resultAsDateObject", "loop", "startOfWeek", "warnings" ];
            let Dvt = {}, Wvt = {}, Mvt = {}, Yvt = {};
            const result = {
                warnings: "",
                errors: "",
                TypeErrors: ""
            };
            if (!isObjectPlain(dateObject)) {
                result.TypeErrors = errorWarningString((!ds ? "Pivot date - " : "") + "Argument 1 is not an object. See documentation for information.", result.TypeErrors);
                return result;
            }
            for (let prop of Object.keys(dateObject)) {
                if (!propertyList.includes(prop)) {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `${prop} is a property that must be one of these property names - ${propertyList.toString()}`, result.errors);
                }
            }
            if (dateObject.day) {
                Dvt = valuetype(dateObject.day, "d");
                result["D"] = Dvt;
                if (Dvt.type === "error") {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'day' is invalid.`, result.errors);
                } else if (Dvt.type === "absolute") {
                    if (Number(Dvt.offset) < 1 || Number(Dvt.offset) > 31) {
                        result.errors = errorWarningString((!ds ? "Pivot date - " : "") + "'day' is outside the range of less than 1 or greater than 31. You can't have 'day' outside of this range. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.", result.errors);
                    } else if (Number(Dvt.offset) > 28) {
                        result.warnings = errorWarningString((!ds ? "Pivot date - " : "") + "'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.", result.warnings);
                    }
                } else if (Dvt.type === "relative") {
                    if (isNumberSigned(Dvt.offset)) {
                        if (Number(Dvt.offset) > 365) {
                            result.warnings = errorWarningString((!ds ? "Pivot date - " : "") + "'day' is a high number. Why don't you use years and/or months instead.", result.warnings);
                        }
                    }
                }
            } else {
                result.errors = errorWarningString((!ds ? "Pivot date - " : "") + "'day' property is empty. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.", result.errors);
            }
            if (dateObject.week) {
                Wvt = valuetype(dateObject.week, "w");
                result["W"] = Wvt;
                if (Wvt.type === "error") {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'week' is invalid.`, result.errors);
                } else if (Wvt.type === "absolute") {
                    if (Number(Wvt.offset) < 1 || Number(Wvt.offset) > 53) {
                        result.errors = errorWarningString((!ds ? "Pivot date - " : "") + "'week' is less than 1 or greater than 53. You can't have 'week' outside of this range.", result.errors);
                    }
                } else if (Wvt.type === "relative") {
                    if (isNumberSigned(Wvt.offset)) {
                        if (Number(Wvt.offset) > 53) {
                            result.warnings = errorWarningString((!ds ? "Pivot date - " : "") + "'week' is a high number. Why don't you use years and/or months instead.", result.warnings);
                        }
                    }
                }
            }
            if (dateObject.month) {
                Mvt = valuetype(dateObject.month, "m");
                result["M"] = Mvt;
                if (Mvt.type === "error") {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'month' is invalid.`, result.errors);
                } else if (Mvt.type === "absolute") {
                    if (Number(Mvt.offset) < 1 || Number(Mvt.offset) > 12) {
                        result.errors = errorWarningString((!ds ? "Pivot date - " : "") + "'month' is less than 1 or greater than 12. You can't have 'month' outside of this range.", result.errors);
                    }
                } else if (Mvt.type === "relative") {
                    if (isNumberSigned(Mvt.offset)) {
                        if (Number(Mvt.offset) > 48) {
                            result.warnings = errorWarningString((!ds ? "Pivot date - " : "") + "'month' is a high number. Why don't you use years and/or months instead.", result.warnings);
                        }
                    }
                }
            }
            if (dateObject.year) {
                Yvt = valuetype(dateObject.year, "y");
                result["Y"] = Yvt;
                if (Yvt.type === "error") {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'year' is invalid. 'year' isn't a number.`, result.errors);
                } else if (Yvt.type === "absolute") {
                    if (!isYearValid(Yvt.offset, 1600, 2300)) {
                        result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.`, result.errors);
                    }
                } else if (Yvt.type === "relative") {
                    if (isNumberSigned(Yvt.offset)) {
                        if (Number(Yvt.offset) > 500) {
                            result.warnings = errorWarningString((!ds ? "Pivot date - " : "") + `'year' is a high number - ${Yvt.offset}. Are you sure this is correct?.`, result.warnings);
                        }
                    }
                }
            }
            if ((Dvt.type === "absolute" || Dvt.type === "current") && !isObjectEmpty(Wvt)) {
                result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `Day number and week number can't go together.`, result.errors);
            }
            if (Dvt.type === "relative") {
                if (!isObjectEmpty(Wvt) || !isObjectEmpty(Mvt) || !isObjectEmpty(Yvt)) {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'day' is relative. You can't have any other date properties, no week, month or year properties.  Eg if it's tomorrow (day: -1), you can't set week, month or year.`, result.errors);
                }
            }
            if (Dvt.type === "dayofweek") {
                if (!isObjectEmpty(Mvt)) {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'day' is a day of the week. You can't have a month properties set. Eg { day: "Tuesday", month: 5 } doesn't make sense. You can have { day: "Tuesday 2", month: 5} which would return the 2nd Tuesday of May for the current year.`, result.errors);
                }
            }
            if (Dvt.type === "dayofweek weeknum") {
                if (!isObjectEmpty(Wvt)) {
                    result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `'day' is a day of the week with an occurrence. You can't have a week properties set. Eg { day: "Tuesday 2", week: 5 } doesn't make sense. You can have { day: "Tuesday 2"} or { day: "Tuesday 2", month: 5}.`, result.errors);
                }
            }
            if ((Wvt.type === "absolute" || Wvt.type === "current") && !isObjectEmpty(Mvt) && Mvt.type !== "error") {
                result.errors = errorWarningString((!ds ? "Pivot date - " : "") + `Week of year with month can't go together.`, result.errors);
            }
            return result;
        }
    }
    return BlueMoon;
}));
