let addition = function (a, b) {
  return a + b;
};

let subtraction = function (a, b) {
  return a - b;
};

let multiply = function (a, b) {
  return a * b;
};

let divide = function (a, b) {
  return a / b;
};

let operate = function (operator, a, b) {
  switch (operator) {
    case "+":
      return addition(a, b);
    case "-":
      return subtraction(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return console.log("error: something happened");
  }
};

const display = document.getElementById("calcResult");
const calculatorKeys = document.querySelectorAll(".calculatorKey");
const calculatorOperator = document.querySelector(".operatorButtons");

calculatorKeys.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const keyValue = key.textContent;
      const displayValue = display.textContent;
      const lastKeyType = calculatorOperator.dataset.lastKeyPress;

      if (!action) {
        if (displayValue === "0" || lastKeyType === "operator") {
          //If the displayed value is zero. Replace zero with pressed button value.
          display.textContent = keyValue;
        } else {
          //If the displayed value is not zero append displayed value with pressed button value.
          display.textContent += keyValue;
        }
      }

      if (action === "decimal") {
        display.textContent = displayValue + ".";
      }

      if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
      ) {
        calculatorOperator.dataset.lastKeyPress = "operator";
        console.log("operator key!");
      }

      if (action === "clear") {
        console.log("clear");
      }

      if (action === "backspace") {
        console.log("backspace");
      }

      if (action === "calculate") {
        console.log("calculate");
      }
    }
  });
});
