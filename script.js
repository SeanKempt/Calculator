let addition = function (a, b) {
  return parseFloat(a) + parseFloat(b);
};

let subtraction = function (a, b) {
  return parseFloat(a) - ParseFloat(b);
};

let multiply = function (a, b) {
  return parseFloat(a) * parseFloat(b);
};

let divide = function (a, b) {
  return parseFloat(a) / ParseFloat(b);
};

let operate = function (operator, a, b) {
  switch (operator) {
    case "add":
      return addition(a, b);
    case "subtract":
      return subtraction(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    default:
      return console.log("error: something happened");
  }
};

const display = document.getElementById("calcResult");
const calculatorKeys = document.querySelectorAll(".calculatorKey");
const calculatorOperator = document.querySelector(".operatorButtons");
const calculator = document.querySelector(".calculator");

calculatorKeys.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const keyValue = key.textContent;
      const displayValue = display.textContent;
      const lastKeyType = calculator.dataset.lastKeyPress;

      if (!action) {
        if (displayValue === "0" || lastKeyType === "operator") {
          //If the displayed value is zero. Replace zero with pressed button value.
          display.textContent = keyValue;
          calculator.dataset.lastKeyPress = "number";
        } else {
          //If the displayed value is not zero append displayed value with pressed button value.
          display.textContent += keyValue;
          calculator.dataset.lastKeyPress = "number";
        }
      }

      if (action === "decimal") {
        display.textContent = displayValue + ".";
        calculator.dataset.lastKeyPress = "decimal";
      }

      if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
      ) {
        calculator.dataset.lastKeyPress = "operator";
        calculator.dataset.firstValue = displayValue;
        calculator.dataset.operator = action;
      }

      if (action === "clear") {
        calculator.dataset.lastKeyPress = "clear";
        display.textContent = "0";
      }

      if (action === "backspace") {
        calculator.dataset.lastKeyPress = "backspace";
      }

      if (action === "calculate") {
        calculator.dataset.lastKeyPress = "calculate";
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayValue;

        display.textContent = operate(operator, firstValue, secondValue);
      }
    }
  });
});
