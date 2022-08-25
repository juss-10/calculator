const previousOutput = document.querySelector("[data-previous-output]");
const currentOutput = document.querySelector("[data-current-output]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const decimalButton = document.querySelector("[data-decimal]")
const equalsButton = document.querySelector("[data-equals]");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const inputButtons = [...numberButtons, ...operatorButtons];
const disabledButtons = [...inputButtons, deleteButton, decimalButton, equalsButton];
const inputs = [];
let input;
let lastInput;
let isLastInputNumber;
let isExpression;
let hasOperator;
let result;
let hasResult = false;
let isDisabled = false;

inputButtons.forEach(inputButton => inputButton.addEventListener("click", inputHandler))
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", operatorHandler))
numberButtons.forEach(numberButton => numberButton.addEventListener("click", numberHandler))
equalsButton.addEventListener("click", showResult)
clearButton.addEventListener("click", clearHandler)
deleteButton.addEventListener("click", () => {
    if (!hasResult && inputs.length !== 0) deleteLastInput()
})

function inputHandler() {
    setInput.call(this)
    checkInput()
    showInput()
}

function operatorHandler() {
    if (hasResult) {
        updateCalculator(result, input)

    } else if (isExpression) {
        setResult()
        updateCalculator(result, input)
    }
}

function numberHandler() {
    if (hasResult) {
        updateCalculator(input)
    }
}

function clearHandler() {
    if (isDisabled) {
        enableCalculator()
        resetCalculator()
    } else {
        resetCalculator()
    }
}

function deleteLastInput() {
    checkInput()
    const isSingleChar = inputs[lastInput].length === 1;
    const isLastInput = inputs.length === 1;
    
    if (isLastInput && isSingleChar) {
        inputs.pop()
        inputs.push("0")
    } else if (isSingleChar) {
        inputs.pop()
    } else {
        inputs[lastInput] = inputs[lastInput].slice(0, -1)
    }

    showInput()
}

function setInput() {
    input = this.textContent;
    const isInputNumber = !isNaN( Number(input) );
    checkInput()

    if (isLastInputNumber && inputs[lastInput] === "0" && isInputNumber) {
        inputs[lastInput] = input;
    } else if (isLastInputNumber && isInputNumber && !hasResult) {
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
    if (isExpression) {
        setResult()
    }

    if (result === null) {
        showError()
        disableCalculator()
    } else if (isExpression) {
        previousOutput.textContent = `${getExpression()} =`;
        currentOutput.textContent = result;
        hasResult = true;
    }
}

function updateCalculator(...args) {
    previousOutput.textContent = `${getExpression()} = ${result}`;
    clearInputs()
    inputs.push(...args)
    currentOutput.textContent = `${getExpression()}`;
    result = "";
    hasResult = false;
    isExpression = false;
}

function clearInputs() {
    inputs.length = 0;
}

function resetCalculator() {
    clearInputs()
    lastInput = "";
    isLastInputNumber = "";
    isExpression = false;
    hasOperator = false;
    result = "";
    hasResult = false;
    previousOutput.textContent = "";
    currentOutput.textContent = "...";
}

function showError() {
    previousOutput.textContent = "Cannot divide by 0";
    currentOutput.textContent = "Error";
}

function disableCalculator() {
    isDisabled = true;
    disabledButtons.forEach(disabledButton => {
        disabledButton.disabled = true;
        disabledButton.classList.add("disabled")
    })
}

function enableCalculator() {
    isDisabled = false;

    disabledButtons.forEach(disabledButton => {
        disabledButton.disabled = false;
        disabledButton.classList.remove("disabled")
    })
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