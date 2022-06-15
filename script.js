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
  return parseFloat(a) / parseFloat(b);
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
const calcOperators = document.querySelectorAll(".operatorButtons");

//Need to refactor this event listener function severly
calculatorKeys.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const keyValue = key.textContent;
      const displayValue = display.textContent;
      const lastKeyType = calculator.dataset.lastKeyPress;
      let firstValue;

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
      //If decimal key is pressed more than once. The decimal should still only show once.
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
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayValue;
        calculator.dataset.lastKeyPress = "operator";
        calculator.dataset.firstValue = displayValue;
        calculator.dataset.operator = action;
        key.classList.add("ispressed");

        if (
          firstValue &&
          operator &&
          lastKeyType !== "operator" &&
          lastKeyType !== "calculate"
        ) {
          const calculatedValue = operate(firstValue, operator, secondValue);
          display.textContent = calculatedValue;
          calculator.dataset.firstValue = calculatedValue;
        } else {
          calculator.dataset.firstValue = displayValue;
        }
      }

      if (action === "clear") {
        calculator.dataset.firstValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.lastKeyPress = "";
        calculator.dataset.lastKeyPress = "clear";
        display.textContent = "0";
      }

      if (action === "backspace") {
        /* If the display value does not equal zero and doesn't have a length of 1, reduce the length of the display value
        string by 1. Else if the length is 1 set the display value back to zero. */
        if (displayValue !== "0" && displayValue.length !== 1) {
          display.textContent = display.textContent.slice(
            0,
            display.textContent.length - 1
          );
          //removes the blue effect from the selected operator
          calcOperators.forEach((e) => {
            e.classList.remove("ispressed");
          });
        } else if (displayValue.length === 1) {
          display.textContent = "0";
          calcOperators.forEach((e) => {
            e.classList.remove("ispressed");
          });
        }

        if (firstValue !== null) {
          calculator.dataset.operator = "";
          calculator.dataset.firstValue = "";
          calcOperators.forEach((e) => {
            e.classList.remove("ispressed");
          });
        }
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
        /* checks if the first value exsits and if the last key type was the equals button. 
        To continue to display the display value */
        if (firstValue && lastKeyType === "calculate") {
          return display.textContent;
        }
      }
    }
  });
});
