function dateBuild(datestring) {
    let str = datestring.trim()

    let a, d, w, m, y
    let todayDt = new Date()

    if (datestring === "today") {
        return {
            d: todayDt.getDate(),
            m: todayDt.getMonth() + 1,
            y: (todayDt.getYear() - 100),
            error: ""
        }
    }

    if (countOccurrences(datestring, "A") > 1 || countOccurrences(datestring, "D") > 1 || countOccurrences(datestring, "W") > 1 || countOccurrences(datestring, "M") > 1 || countOccurrences(datestring, "Y") > 1) {

        return {
            d: todayDt.getDate(),
            m: todayDt.getMonth() + 1,
            y: (todayDt.getYear() - 100),
            error: "A, D, W, M or Y has been entered more than once"
        }
    }


    a = (str.match(/A[^A|^D|^W|^M|^Y]*/)) ? str.match(/A[^A|^D|^W|^M|^Y]*/)[0] : "";
    d = (str.match(/D[^A|^D|^W|^M|^Y]*/)) ? str.match(/D[^A|^D|^W|^M|^Y]*/)[0] : "";
    w = (str.match(/W[^A|^D|^W|^M|^Y]*/)) ? str.match(/W[^A|^D|^W|^M|^Y]*/)[0] : "";
    m = (str.match(/M[^A|^D|^W|^M|^Y]*/)) ? str.match(/M[^A|^D|^W|^M|^Y]*/)[0] : "";
    y = (str.match(/Y[^A|^D|^W|^M|^Y]*/)) ? str.match(/Y[^A|^D|^W|^M|^Y]*/)[0] : "";

    return {
        A: a,
        D: d,
        W: w,
        M: m,
        Y: y
    }
}


// console.log(dateBuild("as5AxxDbt!"))
// console.log(dateBuild("as5AxxY+1"))
// console.log(dateBuild("M-2"))
// console.log(dateBuild("Adfdas5AxxDbt!"))
// console.log(dateBuild("Yas5AxxDbt!"))
// console.log(dateBuild("YasY5AxxDbt!"))


let dateBuilt = dateBuild("M-28")

if (dateBuilt.M) {
    console.log(dateBuilt.M)
    let m = getOffset(dateBuilt.M)
    console.log(m)
}


function dateObjectsPutTogether(dateobject) {
    let result = []

    console.log(dateobject)
    if (dateobject.A)
        result.push(getOffset(dateobject.A))
    if (dateobject.D)
        result.push(getOffset(dateobject.D))
    if (dateobject.W)
        result.push(getOffset(dateobject.W))
    if (dateobject.M)
        result.push(getOffset(dateobject.M))
    if (dateobject.Y)
        result.push(getOffset(dateobject.Y))

    return result
}

console.log("HERE ***********************")
console.log(dateBuild("AsuM-5"))
console.log(dateObjectsPutTogether(dateBuild("AsuM-5")))



function getOffset(datepart) {
    // which one is it - A, D, W, M, Y. It's in the first character
    console.log("datepart - " + datepart)
    let adwmy = datepart[0]
    let position = 1
    let posNeg = ""

    // debugger
    if (datepart.length !== 1) {
        if (datepart[position] === "+" || datepart[position] === "-") {
            posNeg = datepart[position]
            position += 1

            let doffset = findConsecutiveNumbers(datepart.slice(position))
            position += String(doffset).length

            if (position === datepart.length) {
                return {
                    datepart: adwmy,
                    offset: Number(posNeg + doffset),
                    type: "relative"
                }

            } else {
                if (datepart[position] === "e" && adwmy === "M") {
                    return {
                        datepart: adwmy,
                        offset: "e",
                        type: "relative " + datepart[position]
                    }
                } else {
                    // error
                    return {
                        datepart: adwmy,
                        offset: 0,
                        type: "error - " + adwmy + " is not the correct format"
                    }
                }
            }
        } else {
            if (isNumber(datepart[position])) {
                let offsetValue = findConsecutiveNumbers(datepart.slice(position))

                return {
                    datepart: adwmy,
                    offset: Number(offsetValue),
                    type: "absolute"
                }

            } else {
                if (datepart[position] === "e" && adwmy === "M") {
                    return {
                        datepart: adwmy,
                        offset: "e",
                        type: "relative " + datepart[position]
                    }

                } else {
                    // error
                    return {
                        datepart: adwmy,
                        offset: 0,
                        type: "error - " + adwmy + " is not the correct format"
                    }
                }
            }
        }
    } else {
        // "D" or "W" or "M" or "Y" entered only. Offset is zero
        return {
            datepart: adwmy,
            offset: 0,
            type: "absolute"
        }

    }

}
