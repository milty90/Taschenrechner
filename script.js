var resultsList = [];

function appendToDisplay(value) {
  const display = document.getElementById("display");
  const resultsListElement = document.querySelector(".results-list");

  if (value === "=") {
    try {
      const calculation = display.value;
      const result = eval(display.value);

      const formattedCalculation = calculation
        .replace(/\+/g, " + ")
        .replace(/\-/g, " - ")
        .replace(/\*/g, " * ")
        .replace(/\//g, " / ");

      const fullCalculation = `${formattedCalculation} = ${result}`;

      resultsList.push(fullCalculation);

      const listItem = document.createElement("li");
      listItem.textContent = fullCalculation;
      resultsListElement.appendChild(listItem);

      display.value = result;

      // console.log("Calculation added:", fullCalculation);
    } catch (error) {
      display.value = "Fehler";
    }
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.value = "";
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
