function convertTemp() {
  const temp = parseFloat(document.getElementById("inputTemp").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const result = document.getElementById("result");

  if (isNaN(temp)) {
    result.textContent = "Please enter a valid temperature.";
    return;
  }

  if (!fromUnit || !toUnit) {
    result.textContent = "Please select both units.";
    return;
  }

  if (fromUnit === toUnit) {
    result.textContent = "From and To units cannot be the same.";
    return;
  }

  let converted;

  if (fromUnit === "C" && toUnit === "F") {
    converted = (temp * 9/5) + 32;
  } else if (fromUnit === "C" && toUnit === "K") {
    converted = temp + 273.15;
  } else if (fromUnit === "F" && toUnit === "C") {
    converted = (temp - 32) * 5/9;
  } else if (fromUnit === "F" && toUnit === "K") {
    converted = ((temp - 32) * 5/9) + 273.15;
  } else if (fromUnit === "K" && toUnit === "C") {
    converted = temp - 273.15;
  } else if (fromUnit === "K" && toUnit === "F") {
    converted = ((temp - 273.15) * 9/5) + 32;
  }

  converted = Math.round(converted * 100) / 100;

  result.textContent = `${temp}°${fromUnit} = ${converted}°${toUnit}`;
}

function clearForm() {
  document.getElementById("inputTemp").value = "";
  document.getElementById("fromUnit").selectedIndex = 0;
  document.getElementById("toUnit").selectedIndex = 0;
  document.getElementById("result").textContent = "";
}
