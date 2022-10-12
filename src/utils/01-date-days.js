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


function dayToNumber(dayname) {
    return daysNameList.findIndex(day => day.toLowerCase() === dayname.toLowerCase());
}

function dayToNumberThreeLetter(daynamethreeletter) {
    return daysNameList.findIndex(day => day.slice(0, 3).toLowerCase() === daynamethreeletter.toLowerCase());
}


export {
    daysNameList,
    dayToNumber,
    dayToNumberThreeLetter
}
