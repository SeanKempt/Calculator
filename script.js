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
let displayValue;
const calculatorButtons = document.querySelectorAll(".calculatorButtons");
/* Adds event listener to all the calculator buttons and then updates the display with whatever button is clicked */
calculatorButtons.forEach((button) => {
  display.textContent = ""; //Sets the value to a empty string to remove the intial value of the calculator
  button.addEventListener("click", function updateDisplay() {
    displayValue = display.textContent += button.textContent; //can't convert here because we need string for display on calculator
    displayValue = Number(displayValue); //Converts string to number for use in calculator functions
  });
});

/*Next steps: When operator button is pressed, its the only thing that shows in the display value and probably store
in a variable as a string to pass to the operator function ---- also fix the issue with the zero not showing up */
