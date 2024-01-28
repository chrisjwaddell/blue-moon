/* ******************************************************************************
 * NUMBER
 *******************************************************************************/

// unsigned number, not a decimal, no + or -
// consecutive numbers only
function isNumber(char) {
	return /^\d+$/.test(char)
}

function isNumberSigned(char) {
	return /^[+|-]\d+$/.test(char)
}

// It can be signed or unsigned number
function isNumberSign(char) {
	return /^[+|-]?\d+$/.test(char)
}

// extract numbers out of a string
function getNumbers(str) {
	return str.replace(/\D+/g, "")
}

export {isNumber, isNumberSign, isNumberSigned, getNumbers}
