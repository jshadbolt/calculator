const numBtns = Array.from(document.querySelectorAll('.number'))
const opBtns = Array.from(document.querySelectorAll('.operator'))
const funcBtns = Array.from(document.querySelectorAll('.function'))
const display = document.getElementById('display')

let plusOrMinusBtn = document.getElementById('plusOrMinus')
let decimalBtn = document.getElementById('decimal')
let equalBtn = document.getElementById('equal')
let clearBtn = document.getElementById('clear')
let delBtn = document.getElementById('del')

let numArr = []
let operator = ''
let currentNum = ''
let operatorSelected = true
let toggle = false

function init() {
    numArr = []
    operator = '+'
    currentNum = ''
    operatorSelected = true
    updateDisplay(currentNum)
}

let calcFuncs = {
    add: function (a, b) {
        return a + b
    },
    subtract: function (a, b) {
        return a - b
    },
    multiply: function (a, b) {
        return a * b
    },
    divide: function (a, b) {
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
                if (num1 === 0 && num2 === 0) {
                    updateDisplay('Overflow')
                    numArr = []
                    return
                } else if (num1 === 0 || num2 === 0) {
                    result = num1 === 0 ? num1 : num2;
                } else {
                    result = calcFuncs.divide(num1, num2)
                }
                break;
        }
        numArr.unshift(isInteger(result))
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
    }
}

function resetCurrentNum() {
    currentNum = ''
}

function updateDisplay(value) {
    display.innerHTML = value
}

function deleteChar() {
    currentNum = currentNum.slice(0, -1)
}

function isInteger(num) {
    return num % 1 != 0 ? num.toFixed(3) : num
}

function addOpToggle(button) {
    opBtns.forEach(btn => btn.classList.remove('clicked'));
    button.classList.add('clicked');
}

function removeOpToggle() {
    
    opBtns.forEach(btn => btn.classList.remove('clicked'));
}

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (operatorSelected) {
            value = btn.value
            currentNum += value
            updateDisplay(currentNum)
            console.log(currentNum)
        }
        removeOpToggle();
    })
})

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        addOpToggle(btn);
        operatorSelected = true;
        createNewNum(currentNum);
        resetCurrentNum();
        operate(operator);
        operator = btn.value;
        console.log(operator);
    })
})

equalBtn.addEventListener('click', () => {
    if (operatorSelected) {
        createNewNum(currentNum);
        resetCurrentNum();
        operate(operator);
        operatorSelected = false;
        removeOpToggle(); 
    }
})

delBtn.addEventListener('click', () => {
    deleteChar();
    updateDisplay(currentNum);
})

clearBtn.addEventListener('click', () => {
    init();
})

decimalBtn.addEventListener('click', () => {
    if (currentNum.includes('.') || !(currentNum.length)) {
        return
    } else {
        currentNum += '.';
        updateDisplay(currentNum);
    }
})

plusOrMinusBtn.addEventListener('click', () => {
    if (operatorSelected) {
        if (currentNum.includes('-')) {
            currentNum = currentNum.slice(1);
            updateDisplay(currentNum);
        } else {
            currentNum = `-${currentNum}`;
            updateDisplay(currentNum);
        }
    }
})

//to add: nice ui

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;

    if (/\d/.test(key)) {
        handleDigitKeyPress(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorKeyPress(key);
    } else if (key === '.') {
        handleDecimalKeyPress();
    } else if (key === 'Enter' || key === '=') {
        handleEqualKeyPress();
    } else if (key === 'Backspace') {
        handleDeleteKeyPress();
    } else if (key.toLowerCase() === 'c') {
        handleClearKeyPress();
    }
}

function handleDigitKeyPress(key) {
    if (operatorSelected) {
        currentNum = key;
        updateDisplay(currentNum);
        operatorSelected = false;
        removeOpToggle(); 
    } else {
        currentNum += key;
        updateDisplay(currentNum);
    }
}

function handleOperatorKeyPress(key) {
    const operatorBtn = opBtns.find(btn => btn.value === key);
    if (operatorBtn) {
        addOpToggle(operatorBtn);
        operatorSelected = true;
        createNewNum(currentNum);
        resetCurrentNum();
        operate(operator);
        operator = key;
    }
}

function handleDecimalKeyPress() {
    if (!currentNum.includes('.')) {
        currentNum += '.';
        updateDisplay(currentNum);
    }
}

function handleEqualKeyPress() {
    if (!operatorSelected) {
        createNewNum(currentNum);
        resetCurrentNum();
        operate(operator);
        operatorSelected = false;
        removeOpToggle();
    }
}

function handleDeleteKeyPress() {
    deleteChar();
    updateDisplay(currentNum);
}

function handleClearKeyPress() {
    init();
}