let resultsList = [];
let previousValue = "";
let currentOperator = "";
let isNewCalculation = false;

const display = document.getElementById("display");
const displayResult = document.getElementById("display_result");
const resultsListElement = document.querySelector(".results-list");

function updateDisplayFontSize() {
  const displayLength = display.value.length;

  if (displayLength > 10) {
    display.style.fontSize = "1.2em";
  } else {
    display.style.fontSize = "2em";
  }
}

function appendToDisplay(value) {
  console.log("Funktion wurde mit dem Wert aufgerufen:", value); // Test log
  const operators = ["+", "-", "*", "/"];

  if (value === "=") {
    try {
      if (display.value) {
        let calculation = display.value;
        let result;

        const hasOperators = operators.some((op) => calculation.includes(op));

        if (hasOperators) {
          result = eval(calculation.replace(/\s/g, ""));

          const formattedCalculation = calculation
            .replace(/\+/g, " + ")
            .replace(/\-/g, " - ")
            .replace(/\*/g, " * ")
            .replace(/\//g, " / ");

          const fullCalculation = `${formattedCalculation} = ${result}`;

          resultsList.push(fullCalculation);
          const listItem = document.createElement("li");
          listItem.innerHTML = fullCalculation;
          resultsListElement.appendChild(listItem);

          displayResult.value = formattedCalculation;
        } else if (currentOperator && previousValue) {
          calculation =
            previousValue + " " + currentOperator + " " + display.value;
          result = calculateResult(
            previousValue,
            currentOperator,
            display.value
          );

          const fullCalculation = `${parseFloat(
            previousValue
          )} ${currentOperator} ${parseFloat(display.value)} = ${result}`;

          resultsList.push(fullCalculation);
          const listItem = document.createElement("li");
          listItem.innerHTML = fullCalculation;
          resultsListElement.appendChild(listItem);

          displayResult.value = calculation;
        }

        const resultsContainer = document.querySelector(".results");
        resultsContainer.scrollTop = 0;

        display.value = result;
        previousValue = result.toString();
        currentOperator = "";
        isNewCalculation = true;
        updateDisplayFontSize();
      }
    } catch (error) {
      display.value = "Fehler";
      console.error("Fehler während der Berechnung:", error);
    }
  } else if (operators.includes(value)) {
    if (display.value) {
      display.value += value;
      displayResult.value = display.value;
      updateDisplayFontSize();
    }
    isNewCalculation = false;
  } else {
    if (isNewCalculation) {
      display.value = "";
      displayResult.value = "";
      previousValue = "";
      currentOperator = "";
      isNewCalculation = false;
    }
    display.value += value;
    updateDisplayFontSize();
  }
}

function calculateResult(previousValue, currentOperator, currentValue) {
  let tempResult;
  if (currentOperator === "+") {
    tempResult = parseFloat(previousValue) + parseFloat(currentValue);
  } else if (currentOperator === "-") {
    tempResult = parseFloat(previousValue) - parseFloat(currentValue);
  } else if (currentOperator === "*") {
    tempResult = parseFloat(previousValue) * parseFloat(currentValue);
  } else if (currentOperator === "/") {
    tempResult = parseFloat(previousValue) / parseFloat(currentValue);
  } else {
    tempResult = parseFloat(currentValue);
  }
  return tempResult;
}

function clearDisplay() {
  display.value = "";
  displayResult.value = "";
  previousValue = "";
  currentOperator = "";
  isNewCalculation = false;
  updateDisplayFontSize();
}

function clearEverything() {
  resultsList = [];
  resultsListElement.innerHTML = "";
  display.value = "";
  displayResult.value = "";
  previousValue = "";
  currentOperator = "";
  isNewCalculation = false;
  updateDisplayFontSize();
}

function toggleDisplayTheme() {
  const checkbox = document.querySelector(".toggle-checkbox");
  const display = document.querySelector(".calculator__display");

  if (checkbox.checked) {
    display.style.background = "linear-gradient(to bottom, #d5d5d5, #e8e8e8)";
    display.style.backgroundSize = "cover";
    display.style.border = "1px solid #ccc";
    display.style.boxShadow = "0 1px 1px rgb(255 255 255 / 0.5)";
  } else {
    display.style.background = "linear-gradient(to bottom, #a5b49e, #c4d1c0)";
    display.style.backgroundSize = "cover";
    display.style.border = "1px inset #8b9a84";
    display.style.boxShadow = "inset 0 0 8px rgba(0, 0, 0, 0.5)";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".toggle-checkbox");
  toggleDisplayTheme();

  checkbox.addEventListener("change", toggleDisplayTheme);

  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
      appendToDisplay(key);
    } else if (key === "+") {
      appendToDisplay("+");
    } else if (key === "-") {
      appendToDisplay("-");
    } else if (key === "*") {
      appendToDisplay("*");
    } else if (key === "/" || key === "%") {
      event.preventDefault();
      appendToDisplay("/");
    } else if (key === "." || key === ",") {
      appendToDisplay(".");
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      appendToDisplay("=");
    } else if (key === "Escape" || key.toLowerCase() === "c") {
      clearEverything();
    } else if (key === "Backspace" || key === "Delete") {
      event.preventDefault();
      clearDisplay();
    }
  });
});
