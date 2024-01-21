const numBtns = Array.from(document.querySelectorAll('.number'))
const opBtns = Array.from(document.querySelectorAll('.operator'))
const funcBtns = Array.from(document.querySelectorAll('.function'))
let display = document.getElementById('display')

let numArr = []
let operator = []
let displayValue = ''
let currVal = ''

function calc() {
    let num1 = +numArr.pop()
    let num2 = +numArr.pop()
    let symbol = operator.pop()
    let result;
    switch (symbol) {
        case '+':
            result = num1 + num2
            break;
        case '-':
            result = num1 - num2
            break;
        case '*':
            result = num1 * num2
            break;
        case '/':
            result = num1 / num2
            break;
    }
    numArr.push(result)
    showDisplayValue(numArr[0])
}

function updateDisplayValue(value) {
    displayValue += value
}

function resetDisplayValue(value) {
    displayValue = value
}

function showDisplayValue(value) {
    display.innerHTML = value
}

numBtns.forEach(btn => {
    let value = btn.value
    btn.addEventListener('click', () => {
        updateDisplayValue(value)
        showDisplayValue(displayValue)
    })
})

opBtns.forEach(btn => {
    let opSymbol = btn.value
    btn.addEventListener('click', () => {
        updateOperator(opSymbol)
        updateCurrValue(displayValue)
        createNewNumber()
        console.log(numArr)
        console.log(operator)
        if (numArr.length === 2) {
            calc()
            
        }
    })
})

// funcBtns.forEach(btn => {
//     let func = btn.value
//     btn.addEventListener('click', () => {
//         funcObj[func]()
//     })
// })

function createNewNumber() {
    numArr.unshift(currVal)
    currVal = ''
    resetDisplayValue(currVal)
}

function updateCurrValue(value) {
    currVal = value
}

function updateOperator(symbol) {
    operator.unshift(symbol)
}

let funcObj = {
    'equal': function() {

    },
    'del': function() {
        
    },
    'clear': function() {
        numArr = []
    },
}

console.log(operator)






//if array has two numbers, operate