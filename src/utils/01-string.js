/* ******************************************************************************
 * STRING
 *******************************************************************************/

// Return only A-z, a-z from a string
function getCharacters(str) {
    return (str.match(/[A-Za-z]+/g)) ? str.match(/[A-Za-z]+/g).join("") : ""
}
