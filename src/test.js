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


function daysInMonth(month, year) {
    const days = [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31,
        30, 31, 31, 30, 31, 30, 31
    ]
    return days[month - 1]
}


function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
