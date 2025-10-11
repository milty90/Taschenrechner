function appendToDisplay(value) {
  const display = document.getElementById("display");
  if (value === "=") {
    try {
      display.value = eval(display.value);
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

// Toggle display theme function
function toggleDisplayTheme() {
  const checkbox = document.querySelector(".toggle-checkbox");
  const display = document.querySelector(".calculator__display");

  if (checkbox.checked) {
    // Light theme (checked)
    display.style.background = "linear-gradient(to bottom, #d5d5d5, #e8e8e8)";
    display.style.backgroundSize = "cover";
    display.style.border = "1px solid #ccc";
    display.style.boxShadow = "0 1px 1px rgb(255 255 255 / 0.5)";
  } else {
    // Dark/Green theme (unchecked)
    display.style.background = "linear-gradient(to bottom, #a5b49e, #c4d1c0)";
    display.style.backgroundSize = "cover";
    display.style.border = "1px inset #8b9a84";
    display.style.boxShadow = "inset 0 0 8px rgba(0, 0, 0, 0.5)";
  }
}

// Initialize theme and add event listener when page loads
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".toggle-checkbox");

  // Set initial theme
  toggleDisplayTheme();

  // Add event listener for checkbox changes
  checkbox.addEventListener("change", toggleDisplayTheme);
});
