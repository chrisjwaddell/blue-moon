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

// Example : dateToDay(day: "1", month: "1", year:"2020") => 3
// Example : dateToDay(day: "1", month: "1", year:"2021") => 5
// console.log(dateToDay({day: "1", month: "1", year:"2021"})) => 5

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


// function dayOfTheWeek(day, month, year) {
//     const DAY_1970_01_01 = 4
//     let days = day - 1
//     while (month >= 1) {
//         days += daysInMonth(month, year)
//         month -= 1
//     }

//     while (year - 1 >= 1970) {
//         days += daysInYear(year - 1)
//         year -= 1
//     }
//     return (days + DAY_1970_01_01) % 7
// }




export {
    dateToDay,
    dayOfTheWeek
}
