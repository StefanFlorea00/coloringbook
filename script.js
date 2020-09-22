document.addEventListener("DOMContentLoaded", start);
async function start() {
    let response = await fetch("squid-01.svg");
    let mySvgData = await response.text();
    document.querySelector(".wrapper").innerHTML = mySvgData;
    initColoringBook();
}

let selectedColor = "#c0ffee";

function initColoringBook() {
    document.querySelectorAll("path").forEach(el => el.setAttribute("stroke", "black"));
    document.querySelectorAll("path").forEach(el => el.setAttribute("fill", "white"));
    document.querySelector(".colors").childNodes.forEach(el => el.addEventListener("click", clickColors));
    document.querySelector(".squid").childNodes.forEach(el => el.addEventListener("click", clickShapes));
}

function clickColors(event) {
    selectedColor = window.getComputedStyle(this, "").getPropertyValue("background-color");
}

function clickShapes() {
    this.setAttribute("fill", selectedColor);
}