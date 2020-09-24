document.addEventListener("DOMContentLoaded", start);
async function start() {
  let response = await fetch("squid-01.svg");
  let mySvgData = await response.text();
  document.querySelector(".svg-wrapper").innerHTML = mySvgData;
  initColoringBook();
  addColorPickerEvents();
  addSave();
  addClear();
}

let selectedColor = "#c0ffee";

function addSave() {
  document.querySelector("#save-btn").addEventListener("click", save);
}

function addClear() {
  document.querySelector("#clear-btn").addEventListener("click", clear);
}

function clear() {
  document.querySelectorAll("path").forEach((el) => el.setAttribute("fill", "#ffffff"));
  localStorage.clear();
}

let fillValues = [];

function save() {
  fillValues = [];
  for (let i = 0; i < document.querySelectorAll("path").length; i++) {
    fillValues[i] = document.querySelectorAll("path")[i].getAttribute("fill");
    console.log(document.querySelectorAll("path")[i].getAttribute("fill"), fillValues[i]);
  }
  localStorage.setItem("fillValues", fillValues);
  console.log(fillValues);
}

function addColorPickerEvents() {
  document.querySelectorAll("input").forEach((el) => el.addEventListener("input", changeColor));
}

function changeColor() {
  this.parentElement.style.backgroundColor = this.value;
  selectedColor = this.value;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function initColoringBook() {
  fillValues = localStorage.getItem("fillValues");
  console.log(fillValues);
  document.querySelectorAll("path").forEach((el) => el.setAttribute("stroke", "black"));
  if (fillValues)
    for (let i = 0; i < document.querySelectorAll("path").length; i++) {
      document.querySelectorAll("path")[i].setAttribute("fill", fillValues.split(",")[i]);
    }
  else document.querySelectorAll("path").forEach((el) => el.setAttribute("fill", "#fff"));

  document.querySelector(".colors").childNodes.forEach((el) => el.addEventListener("click", clickColors));
  document.querySelector(".squid").childNodes.forEach((el) => el.addEventListener("click", clickShapes));
}

function clickColors() {
  selectedColor = window.getComputedStyle(this, "").getPropertyValue("background-color");
  let rgbsplit = selectedColor.split("(")[1].split(")")[0];
  let red = parseInt(rgbsplit.split(",")[0]);
  let green = parseInt(rgbsplit.split(",")[1]);
  let blue = parseInt(rgbsplit.split(",")[2]);
  let hex = rgbToHex(red, green, blue);
  console.log(hex);
  document.querySelector(".selected-color").style.backgroundColor = hex;
  selectedColor = hex;
}

function clickShapes() {
  this.setAttribute("fill", selectedColor);
}
