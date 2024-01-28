/* ******************************************************************************
 * OBJECT
 *******************************************************************************/

// Checks if an object is a plain object, that is, an object created
// by the Object constructor or one with a [[Prototype]] of null.
// It excludes arrays, functions, null and dates
// which are all technically objects

function isObjectPlain(obj) {
	return obj === null
		? false
		: obj === undefined
		? false
		: Object.prototype.toString.call(obj) === "[object Object]"
}

// For earlier versions of IE, Object.prototype.toString returns "[object Object]" for null and undefined so those checks are included

function isObjectEmpty(value) {
	return (
		Object.prototype.toString.call(value) === "[object Object]" &&
		JSON.stringify(value) === "{}"
	)
}

export {isObjectPlain, isObjectEmpty}
