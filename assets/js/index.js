const previousOutput = document.querySelector("[data-previous-output]");
const currentOutput = document.querySelector("[data-current-output]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const inputButtons = [...numberButtons, ...operatorButtons];
const inputs = [];
let input;
let lastInput;
let isLastInputNumber;
let isExpression;
let hasOperator;
let result;

inputButtons.forEach(inputButton => inputButton.addEventListener("click", inputHandler))
equalsButton.addEventListener("click", showResult)

function inputHandler() {
    setInput.call(this)
    checkInput()

    if (isExpression) {
        setResult()
    }

    showInput()
}

function setInput() {
    input = this.textContent;
    const isInputNumber = !isNaN( Number(input) );
    checkInput()

    if (isLastInputNumber && isInputNumber) {
        inputs[lastInput] += input;
    } else if (!isExpression && (isLastInputNumber && !isInputNumber || isInputNumber)) {
        inputs.push(input)
    } else if (!isLastInputNumber && !hasOperator) {
        inputs.push("0", input)
    } else if (!isLastInputNumber && !isInputNumber) {
        inputs[lastInput] = input;
    }
}

function checkInput() {
    lastInput = inputs.length - 1;
    isLastInputNumber = !isNaN( Number(inputs[lastInput]) );
    isExpression = inputs.length === 3;
    hasOperator = inputs.length === 2;
}

function setResult() {
    result = operate(...inputs);

    if (result !== null) {
        result = result.toString();
    }
}

function getExpression() {
    return inputs.join(" ");
}

function showInput() {
    currentOutput.textContent = getExpression();
}

function showResult() {
    previousOutput.textContent = `${getExpression()} =`;
    currentOutput.textContent = result;
}

function operate(...args) {
    const a = Number( args[0] );
    const b = Number( args[2] );
    const operator = args[1];

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        default:
            return null;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0 || b === -0) {
        return null;
    } else if (a === -0) {
        return 0;
    } else {
        return a / b;
    }
}