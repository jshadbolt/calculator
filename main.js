const numBtns = Array.from(document.querySelectorAll('.number'))
const opBtns = Array.from(document.querySelectorAll('.operator'))
const funcBtns = Array.from(document.querySelectorAll('.function'))
const display = document.getElementById('display')
const allBtns = document.querySelectorAll('button')
const plusOrMinusBtn = document.getElementById('plusOrMinus')
const decimalBtn = document.getElementById('decimal')
const equalBtn = document.getElementById('equal')
const clearBtn = document.getElementById('clear')
const delBtn = document.getElementById('del')
const clickSound = document.getElementById("click-sound");

let numArr = []
let operator = ''
let currentNum = ''
let operatorSelected = true
let toggle = false

function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
}

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
    const decimalPlaces = (num.toString().split('.')[1] || []).length;
    return decimalPlaces > 0 ? num.toFixed(decimalPlaces) : num;
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
            const value = btn.value;
            if (currentNum.length < 15) {
                currentNum += value;
                updateDisplay(currentNum);
            }
        }
        removeOpToggle();
    });
});

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

allBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        playAudio(clickSound)
    })
})

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

function addClickedEffect(button) {
    button.classList.add('key-clicked');
}

function removeClickedEffect(button) {
    button.classList.remove('key-clicked');
}

function handleDigitKeyPress(key) {
    playAudio(clickSound)

    if (operatorSelected) {
        currentNum = key;
        updateDisplay(currentNum);
        operatorSelected = false;
        removeOpToggle();
    } else {
        const numWithoutNonDigits = currentNum.replace(/[^0-9]/g, ''); 
        if (numWithoutNonDigits.length < 15) {
            currentNum += key;
            updateDisplay(currentNum);
        }
    }
    const button = document.querySelector(`.number[value="${key}"]`);
    if (button) {
        addClickedEffect(button);
        setTimeout(() => removeClickedEffect(button), 100);
    }
}

function handleOperatorKeyPress(key) {
    playAudio(clickSound)

    const operatorBtn = opBtns.find(btn => btn.value === key);
    if (operatorBtn) {
        addOpToggle(operatorBtn);
        operatorSelected = true;
        createNewNum(currentNum);
        resetCurrentNum();
        operate(operator);
        operator = key;
        addClickedEffect(operatorBtn);
        setTimeout(() => removeClickedEffect(operatorBtn), 100);
    }
}

function handleDecimalKeyPress() {
    playAudio(clickSound)

    if (!currentNum.includes('.')) {
        currentNum += '.';
        updateDisplay(currentNum);
        const button = document.getElementById('decimal');
        if (button) {
            addClickedEffect(button);
            setTimeout(() => removeClickedEffect(button), 100);
        }
    }
}

function handleEqualKeyPress() {
    playAudio(clickSound)

    if (!operatorSelected) {
        createNewNum(currentNum);
        resetCurrentNum();
        operate(operator);
        operatorSelected = false;
        removeOpToggle();
        const button = document.getElementById('equal');
        if (button) {
            addClickedEffect(button);
            setTimeout(() => removeClickedEffect(button), 100);
        }
    }
}

function handleDeleteKeyPress() {
    playAudio(clickSound)

    deleteChar();
    updateDisplay(currentNum);
    const button = document.getElementById('del');
    if (button) {
        addClickedEffect(button);
        setTimeout(() => removeClickedEffect(button), 100);
    }
}

function handleClearKeyPress() {
    playAudio(clickSound)

    init();
    const button = document.getElementById('clear');
    if (button) {
        addClickedEffect(button);
        setTimeout(() => removeClickedEffect(button), 100);
    }
}

//Known bugs: unable to switch seamlessly from keyboard input to mouse input