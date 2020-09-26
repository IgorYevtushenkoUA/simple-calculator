let numbers = document.querySelectorAll(".number")
let mathOperations = document.querySelectorAll(".math-operation")
let delOperations = document.querySelectorAll(".del-operation")
let decimal = document.getElementById("decimal")
let result = document.getElementById("result")
let display = document.getElementById("display")

let currentNumbers = []
let currentOperation = []
let nextNumber = false
let addedNumberToCurrentNumbers = false
let isOperationAgainClick = true
let isMinusOperation = false

let maxNumbersAfterDot = 0;
let multiplyForDots = 1


////////////////////////////////////////////
for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i]
    num.addEventListener('click', function (e) {
        addNumber(e.target.innerText)
        console.log(e)
    })
}

for (let i = 0; i < mathOperations.length; i++) {
    let operation = mathOperations[i]
    operation.addEventListener('click', function (e) {
        analyzeMathOperation(e.target.innerText)
    })
}

for (let i = 0; i < delOperations.length; i++) {
    let del = delOperations[i]
    del.addEventListener('click', function (e) {
        doDeleteOperation(e.target.innerText)
    })
}

decimal.addEventListener('click', function (e) {
    decimalNumber()
})

result.addEventListener('click', function (e) {
    showResult()
})

//////////////////////////////////////

function addNumber(num) {
    if (display.value.length > 0) {
        if (nextNumber) {
            display.value = num
            nextNumber = false
        } else if (display.value === '0') {
            display.value = num
        } else {
            display.value += num
        }
    } else if (currentNumbers.length == 0) {
        display.value = num
        nextNumber = false
    } else {
        alert("You can not do it because x less than 0")
    }
    addedNumberToCurrentNumbers = false
    isOperationAgainClick = false
    isMinusOperation = true
}

/**
 * typeof num === string
 * @param num
 */
function add2CurrentNumbersList(num) {
    let numbersAfterDot = countNumbersAfterDot(num)
    if (numbersAfterDot > maxNumbersAfterDot) {
        let power = numbersAfterDot - maxNumbersAfterDot
        for (let i = maxNumbersAfterDot; i < numbersAfterDot; i++) {
            multiplyForDots *= 10
        }
        maxNumbersAfterDot = numbersAfterDot
        for (let i = 0; i < currentNumbers.length; i++) {
            currentNumbers[i] = (parseFloat(currentNumbers[i]) * (10 ** power)).toString()
        }
    }
    currentNumbers.push((parseFloat(num) * multiplyForDots).toString())
    debugger
}

function analyzeMathOperation(operation) {
    if (display.value !== '' && !addedNumberToCurrentNumbers && isOperationAgainClick === false) {
//todo check
        add2CurrentNumbersList(display.value)

        addedNumberToCurrentNumbers = true

    }
    if (operation !== '-' && !isOperationAgainClick) {
        if (operation === 'SQRT' && currentNumbers.length > 0) {
            let x = parseFloat(currentNumbers.pop()) / multiplyForDots
            if (x >= 0) {
                x = sqrtOperation(x)
                add2CurrentNumbersList(x.toString())
                // currentNumbers.push(x)
            } else {
                doDeleteOperation('C')
                alert("Нероректні дані в математичній операції")
            }
            // display.value = x

        }
        if (currentOperation.length === 0 && operation !== "SQRT") {
            currentOperation.push(operation)
        } else if (currentOperation.length > 0) {
            let o = currentOperation.pop()
            currentOperation.push(operation)
            doMathOperation(o)

        }
        nextNumber = true
        isOperationAgainClick = operation === "SQRT" ? false : true
        isMinusOperation = false
    } else if (operation === "-") {
        if (isMinusOperation) {

            if (currentOperation.length === 0) {
                currentOperation.push("-")
            } else if (currentOperation.length > 0) {
                let o = currentOperation.pop()
                currentOperation.push(operation)
                doMathOperation(o)
                addedNumberToCurrentNumbers = false
                isOperationAgainClick = false
                isMinusOperation = false
            }
            nextNumber = true
            isMinusOperation = false
        } else {

            negativeNumber()
            isMinusOperation = true
            addedNumberToCurrentNumbers = true
            isOperationAgainClick = false
            nextNumber = false
        }
    }
}

function doMathOperation(operation) {
    debugger
    let y = parseFloat(currentNumbers.pop())
    let x = parseFloat(currentNumbers.pop())
    isMinusOperation = false
    let res = 0
    if (operation === '+') {
        res = x + y
    } else if (operation === '-') {
        res = x - y
    } else if (operation === '*') {
        res = x * y
        if (maxNumbersAfterDot > 0) {
            debugger
            res /= 10**(maxNumbersAfterDot+1)
            debugger
        }
    } else if (operation === '/') {
        res = x / y
    } else if (operation === 'POW') {
        x /= multiplyForDots
        y /= multiplyForDots
        res = x ** y
    } else if (operation === 'SQRT') {
        alert("HERE I DONT KNOW KNOW")
        res = "99999"
    }
    res /= (operation === 'POW'|| operation === "*") ? 1 : multiplyForDots
    add2CurrentNumbersList(res.toString())
    debugger
    display.value = (parseFloat(currentNumbers[0]) / multiplyForDots).toString()
    // currentNumbers.push(res.toString())
    // display.value = res.toString()
    nextNumber = true
    isMinusOperation = false

}

function decimalNumber() {
    let decimalNum = display.value
    if (decimalNum === '') {
        decimalNum = '0.'
    } else {
        if (decimalNum.indexOf('.') === -1)
            decimalNum += '.'
    }
    display.value = decimalNum
}

function showResult() {
    if (currentOperation.length > 0) {
        add2CurrentNumbersList(display.value)
        debugger
        doMathOperation(currentOperation.pop())

        // currentNumbers.push(display.value)
    } else {
        if (currentNumbers.length > 0) {
            let res = (parseFloat(currentNumbers.pop()) / multiplyForDots).toString()
            display.value = res
            debugger
            // display.value = currentNumbers.pop()
        }
    }
    currentOperation = []
    currentNumbers = []
    nextNumber = true
    isOperationAgainClick = true
    isMinusOperation = false
    maxNumbersAfterDot = 0;
    multiplyForDots = 1

}

function doDeleteOperation(operation) {
    if (operation === "C") {
        display.value = ''
        currentNumbers = []
        currentOperation = []
    } else {
        if (display.value.length >= 2) {
            display.value = display.value.slice(0, display.value.length - 1)
        } else {
            //todo check
            display.value = ''
        }
    }
    isOperationAgainClick = true
}

//////////////////
function negativeNumber() {
    if (display.value !== "-") {
        display.value = "-"
    } else {
        console.log("negative Number watch here")
    }
}

function sqrtOperation(num) {
    return Math.sqrt(num)
}

function countNumbersAfterDot(num) {
    let count = 0;
    while (num.includes(".")) {
        num = num.slice(0, num.length - 1)
        count++
    }
    return count - 1
}
