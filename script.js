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

let displayValue;
const display = document.getElementById("calcResult");
const calculatorKeys = document.querySelectorAll(".calculatorKey");

calculatorKeys.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;

      if (!action) {
        console.log("number key!");
      }

      if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
      ) {
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
