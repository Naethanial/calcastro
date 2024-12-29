const CONSTANTS_MAP = {
  "earth mass in kg": 5.972e24,
  "solar mass in kg": 1.989e30,
  "hubble constant": 70,
  "arcsec to rad": 4.84813681109536e-6,
  "stefan const": 5.670374419e-8,
  "pi": 3.141592653589793,
  "degree to radian": 3.141592653589793 / 180,
  "jupiter mass in kg": 1.898e27,
  "gravitational constant": 6.67430e-11,
  "wein disp constant": 2.897771955e-3,
  "parsec in km": 3.085677581e13,
  "light year in km": 9.4607e12,
  "speed of light": 299792458,
  "sun luminosity in watts": 3.828e26,
  "sun absolute magnitude": 4.83
};

// carti please drop
const FUNCTION_MAP = {
  "sin(": "Math.sin(",
  "cos(": "Math.cos(",
  "tan(": "Math.tan(",
  "log(": "Math.log10(",
  "ln(": "Math.log(",
  "sqrt(": "Math.sqrt("
};

// Grabbing important DOM elements
const expressionInput = document.getElementById("expressionInput");
const resultDisplay = document.getElementById("resultDisplay");
const equalsBtn = document.getElementById("equalsBtn");
const clearBtn = document.getElementById("clearBtn");

document.querySelectorAll(".constant-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const symbol = btn.getAttribute("data-symbol");
    insertAtCursor(expressionInput, symbol);
  });
});

document.querySelectorAll(".button-container button[data-value]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    insertAtCursor(expressionInput, value);
  });
});

clearBtn.addEventListener("click", () => {
  expressionInput.value = "";
  resultDisplay.textContent = "";
});

equalsBtn.addEventListener("click", () => {
  calculateExpression();
});

expressionInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); 
    calculateExpression();
  }
});

function insertAtCursor(input, textToInsert) {
  const startPos = input.selectionStart;
  const endPos = input.selectionEnd;
  
  const currentValue = input.value
  
  input.value =
    currentValue.substring(0, startPos) +
    textToInsert +
    currentValue.substring(endPos, currentValue.length);

  
  const newCursorPos = startPos + textToInsert.length;
  input.selectionStart = newCursorPos;
  input.selectionEnd = newCursorPos;
  
  input.focus();
}


function calculateExpression() {
  let expr = expressionInput.value;

  for (const [symbol, value] of Object.entries(CONSTANTS_MAP)) {
    const regex = new RegExp(`\\b${symbol}\\b`, "g");
    expr = expr.replace(regex, value);
  }

  for (const [funcCall, jsEquivalent] of Object.entries(FUNCTION_MAP)) {
    const regex = new RegExp(funcCall.replace("(", "\\("), "g");
    expr = expr.replace(regex, jsEquivalent);
  }

  expr = expr.replace(/\^/g, "**");

  expr = expr.replace(/%/g, "/100");

  let result;
  try {
    result = eval(expr);
  } catch (error) {
    result = "Error!";
  }


  resultDisplay.textContent = result;
}
