const numBtns = Array.from(document.querySelectorAll('.number'))
const opBtns = Array.from(document.querySelectorAll('.operator'))
const funcBtns = Array.from(document.querySelectorAll('.function'))

let equalBtn = document.getElementById('equal')
let clearBtn = document.getElementById('clear')
let display = document.getElementById('display')

let numArr = []
let operator = '+'
let displayValue = ''
let currentNum = ''
let operatorSelected = true


function init() {
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
        display.innerHTML = numArr[0]
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

function resetCurrentNum() {
    currentNum = ''
}
