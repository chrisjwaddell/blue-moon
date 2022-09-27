/* ******************************************************************************
 * NUMBER
 *******************************************************************************/

function isNumber(char) {
    return /^\d$/.test(char);
}


/* ******************************************************************************
 * STRING
 *******************************************************************************/

// Count the number of occurrences of a string in another one
function countOccurrences(mainstring, searchstring) {
    let findExp = new RegExp(searchstring, "g");
    let count = (mainstring.match(findExp) || []).length;

    return count
}

// String :: Number
// Given a string, it returns only the consecutive numbers
// It will stop when numbers don't occur
function findConsecutiveNumbers(stringwithnumbers) {
    let idx = 0
    let found = [...stringwithnumbers].findIndex(cv => !isNumber(cv))

    if (found === -1) {
        return Number(stringwithnumbers)
    }

    return Number(stringwithnumbers.slice(idx, found))
}
