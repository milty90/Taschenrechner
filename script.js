var resultsList = [];
var previousValue = "";
var currentOperator = "";
var isNewCalculation = false;

const display = document.getElementById("display");
const displayResult = document.getElementById("display_result");
const resultsListElement = document.querySelector(".results-list");

function appendToDisplay(value) {
  console.log("Funktion wurde mit dem Wert aufgerufen:", value); // Test log
  const operators = ["+", "-", "*", "/"];

  if (value === "=") {
    try {
      if (display.value && currentOperator && previousValue) {
        const calculation =
          previousValue + " " + currentOperator + " " + display.value;

        console.log("Calculation:", calculation);

        const result = calculateResult(
          previousValue,
          currentOperator,
          display.value
        );

        const fullCalculation =
          parseFloat(previousValue) +
          " " +
          currentOperator +
          " " +
          parseFloat(display.value) +
          " = " +
          result;

        resultsList.push(fullCalculation);
        const listItem = document.createElement("li");
        listItem.innerHTML = fullCalculation;
        resultsListElement.appendChild(listItem);

        displayResult.value = calculation;

        display.value = result;

        previousValue = result.toString();
        currentOperator = "";
        isNewCalculation = true;

        // console.log("Calculation added:", fullCalculation);
      }
    } catch (error) {
      display.value = "Fehler";
      console.error("Fehler während der Berechnung:", error);
    }
  } else if (operators.includes(value)) {
    if (display.value) {
      if (currentOperator && previousValue && !isNewCalculation) {
        display.value = calculateResult(
          previousValue,
          currentOperator,
          display.value
        );
      } else {
        previousValue = display.value;
      }
      currentOperator = value;
      displayResult.value = previousValue + value;
      display.value = "";
      isNewCalculation = false;
    }
  } else {
    if (isNewCalculation) {
      display.value = "";
      displayResult.value = "";
      previousValue = "";
      currentOperator = "";
      isNewCalculation = false;
    }
    display.value += value;
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
}

function clearEverything() {
  resultsList = [];
  resultsListElement.innerHTML = "";
  display.value = "";
  displayResult.value = "";
  previousValue = "";
  currentOperator = "";
  isNewCalculation = false;
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
});
