const numBtns = Array.from(document.querySelectorAll('.number'))
const opBtns = Array.from(document.querySelectorAll('.operator'))
const funcBtns = Array.from(document.querySelectorAll('.function'))
const display = document.getElementById('display')

let equalBtn = document.getElementById('equal')
let clearBtn = document.getElementById('clear')
let delBtn = document.getElementById('del')

let numArr = []
let operator = ''
let currentNum = ''
let operatorSelected = false

function init() {
    numArr = []
    operator = '+'
    currentNum = ''
    operatorSelected = false
    updateDisplay(currentNum)
}

let calcFuncs = {
    add : function(a, b) {
        return a + b
    },
    subtract : function(a, b) {
        return a - b
    },
    multiply : function(a, b) {
        return a * b
    },
    divide : function(a, b) {
        return a / b
    },
}

function operate(operator) {
    if (numArr.length > 1) {
        let num1 = +numArr.shift()
        let num2 = +numArr.shift()
        let result;
        switch (operator) {
                case '+':
                    result = calcFuncs.add(num1, num2)
                    break;
                case '-':
                    result = calcFuncs.subtract(num1, num2)
                    break;
                case '*':
                    result = calcFuncs.multiply(num1, num2)
                    break;
                case '/':
                    if (num1 === 0 && num2 === 0 ) {
                        updateDisplay('Overflow')
                        numArr = []
                        return
                    } else if (num1 === 0 || num2 === 0 ) {
                        result = num1 === 0 ? num1 : num2;
                    } else {
                    result = calcFuncs.divide(num1, num2)
                    }
                    break;
        }
        //result = result.toFixed(5)
        //need to check for decimal rounding
        numArr.unshift(result.toFixed(3))
        console.log(numArr)
        updateDisplay(numArr[0])
    } else {
        console.log('only one number present')
    }
}

function createNewNum(number) {
    if (number.length < 1) {
        console.log('invalid number')
        return
    } else {
    numArr.push(number)
    // console.log(numArr)
    }
}

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // if (operatorSelected) {
        value = btn.value
        currentNum += value
        updateDisplay(currentNum)
        console.log(currentNum)
        // }
    })
})

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        operatorSelected = true
        createNewNum(currentNum)
        resetCurrentNum()
        operate(operator)
        operator = btn.value
        console.log(operator)
    })
})

equalBtn.addEventListener('click', () => {
    if (operatorSelected) {
    createNewNum(currentNum)
    resetCurrentNum()
    operate(operator)
    operatorSelected = false
    }
})

delBtn.addEventListener('click', () => {
    deleteChar()
    updateDisplay(currentNum)
})

clearBtn.addEventListener('click', () => {
    init()
})

function resetCurrentNum() {
    currentNum = ''
}

function updateDisplay(value) {
    display.innerHTML = value
}

function deleteChar() {
    currentNum = currentNum.slice(0, -1)
}

// to add: rounding, decimal support, positive/negative number support, keyboard support, nice ui