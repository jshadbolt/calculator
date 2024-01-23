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
    operatorSelected = true
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
        switch (operator) {
                case '+':
                    numArr.unshift(calcFuncs.add(num1, num2))
                    break;
                case '-':
                    numArr.unshift(calcFuncs.subtract(num1, num2))
                    break;
                case '*':
                    numArr.unshift(calcFuncs.multiply(num1, num2))
                    break;
                case '/':
                    numArr.unshift(calcFuncs.divide(num1, num2))
                    break;
        }
        console.log(numArr)
        updateDisplay(numArr[0])
    } else {
        console.log('not long enough')
    }
}

function createNewNum(number) {
    if (number.length < 1) {
        console.log('wrong')
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