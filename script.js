var resultsList = [];

function appendToDisplay(value) {
  const display = document.getElementById("display");
  const resultsListElement = document.querySelector(".results-list");

  if (value === "=") {
    try {
      const calculation = display.value; // Az eredeti számítás
      const result = eval(display.value); // Az eredmény

      // Szóközök hozzáadása a műveleti jelekhez a megjelenítéshez
      const formattedCalculation = calculation
        .replace(/\+/g, " + ")
        .replace(/\-/g, " - ")
        .replace(/\*/g, " * ")
        .replace(/\//g, " / ");

      const fullCalculation = `${formattedCalculation} = ${result}`; // Teljes számítás formátum szóközökkel

      // Hozzáadás a listához
      resultsList.push(fullCalculation);

      // // Eltávolítjuk az animációt az előző elemről (ha van)
      // const previousFirst = resultsListElement.querySelector("li:first-child");
      // if (previousFirst) {
      //   previousFirst.style.animation = "none";
      //   previousFirst.style.width = "26ch";
      //   previousFirst.style.borderRight = "none";
      // }

      // Új lista elem létrehozása és hozzáadása a HTML-hez
      const listItem = document.createElement("li");
      listItem.textContent = fullCalculation;
      resultsListElement.appendChild(listItem);

      // // Kurzor eltávolítása az animáció végén
      // setTimeout(() => {
      //   listItem.style.borderRight = "none";
      // }, 3500); // 3s typing + 0.5s extra idő

      // Az eredmény megjelenítése a display-ben
      display.value = result;

      console.log("Calculation added:", fullCalculation);
    } catch (error) {
      display.value = "Error";
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
