let addition = function (a, b) {
  return parseFloat(a) + parseFloat(b);
};

let subtraction = function (a, b) {
  return parseFloat(a) - parseFloat(b);
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
const calculator = document.querySelector(".calculator");

calculatorKeys.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const keyValue = key.textContent;
      const displayValue = display.textContent;
      const lastKeyType = calculator.dataset.lastKeyPress;

      Array.from(key.parentNode.children).forEach((op) =>
        op.classList.remove("ispressed")
      );

      if (!action) {
        if (
          displayValue === "0" ||
          lastKeyType === "operator" ||
          lastKeyType === "calculate"
        ) {
          //If the displayed value is zero. Replace zero with pressed button value.
          display.textContent = keyValue;
          calculator.dataset.lastKeyPress = "number";
        } else {
          //If the displayed value is not zero append displayed value with pressed button value.
          display.textContent += keyValue;
          calculator.dataset.lastKeyPress = "number";
        }
      }
      //If decimal key is pressed more than once. The decimal should only still show once.
      if (action === "decimal") {
        if (!displayValue.includes(".")) {
          display.textContent = displayValue + ".";
        } else if (lastKeyType === "operator") {
          display.textContent = "0.";
        }
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
        key.classList.add("ispressed");
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

        /*Checks if first value and operator exists and ensures that the last key type was not an operator
         to solve for clicking calculate after pressing an operator */
        if (firstValue && operator && lastKeyType !== "operator") {
          display.textContent = operate(operator, firstValue, secondValue);
        }
      }
    }
  });
});
