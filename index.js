let numbers = document.querySelectorAll('.number')
let basicOperations = document.querySelectorAll('.basic-math-operation')
let sqrtOperation = document.getElementById("sqrt")
let minusOperation = document.getElementById('minus')
let del = document.querySelectorAll(".del-operation")
let decimal = document.getElementById('decimal')
let result = document.getElementById('result')
let display = document.getElementById('display')
let currentValue = 0
let lastOperation = ''
let isFirstNumber = true
let isNewNumber = true
let isMinusNumber = true


for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i]
    number.addEventListener('click', function (e) {
        numberPress(e.target.innerText)
    })
}

for (let i = 0; i < basicOperations.length; i++) {
    let operation = basicOperations[i]
    operation.addEventListener('click', function (e) {
        mathOperation(e.target.innerText)
    })
}

for (let i = 0; i < del.length; i++) {
    let deleteCommand = del[i]
    deleteCommand.addEventListener('click', function (e) {
        clear(e.target.innerText)
    })
}

sqrtOperation.addEventListener('click', function (e) {
    doSqrtOperation(e.target.innerText)
})

minusOperation.addEventListener('click', function (e) {
    workWithMinus()
})

result.addEventListener('click', function (e) {
    showResult()
})

decimal.addEventListener('click', function (e) {
    decimalBtn()
})

///////////////////////////////////////////////////////////////////

function numberPress(num) {
    if (isNewNumber && isMinusNumber === false) {
        if (display.value === '0' || display.value === '') {
            debugger
            display.value = num
        } else {
            debugger
            display.value += num
        }
        isFirstNumber = true
    } else {
        if (display.value === '-') {
            debugger
            display.value += num
        } else {
            if (display.value.length > 0 && isFirstNumber === true)
                display.value += num
            else {
                debugger
                isFirstNumber = true
                display.value = num
            }
        }
    }
    // isNewNumber = false
    isMinusNumber = false
}

function mathOperation(operation) {
    let tempValue = parseFloat(display.value)
    if (isNewNumber) {
        currentValue = tempValue
        lastOperation = operation
    } else {
        switch (lastOperation) {
            case '+' :
                currentValue += tempValue;
                break
            case '*' :
                currentValue *= tempValue;
                break
            case '-' :
                currentValue -= tempValue
                break
            case '/' :
                if (tempValue === 0) {
                    // todo
                    alert("divide on ZIRO")
                }
                currentValue /= tempValue;
                break
            case 'POW' :
                currentValue **= tempValue;
                break
        }
        lastOperation = operation
    }
    display.value = currentValue
    console.log("currentValue = " + currentValue)
    isFirstNumber = false
    isNewNumber = false
    isMinusNumber = true
}

function doSqrtOperation(num) {
    display.value = Math.sqrt(display.value)
    debugger
}

function workWithMinus() {
    if (display.value === '' || isMinusNumber === true) {
        display.value = '-'
        isMinusNumber = false
    } else {
        isMinusNumber = true
        debugger
        mathOperation('-')
    }
}


function clear(arg) {
    if (arg === 'C') {
        console.log(arg)
        display.value = 0
        isMinusNumber = false
    } else {
        console.log(arg)
        if (display.value.length >= 2) {
            display.value = display.value.slice(0, display.value.length - 1)
            debugger
        } else {
            isMinusNumber = false
            display.value = 0
        }
    }
}

function showResult() {
    mathOperation(lastOperation)
    lastOperation = ''
    isNewNumber = true
    isFirstNumber = true
    isMinusNumber = false
}

function decimalBtn() {
    let decimalNumber = display.value
    if (display.value === '') {
        decimalNumber = '0.'
    } else {
        if (decimalNumber.indexOf('.') === -1) {
            decimalNumber += '.'
        }
    }
    display.value = decimalNumber
}
