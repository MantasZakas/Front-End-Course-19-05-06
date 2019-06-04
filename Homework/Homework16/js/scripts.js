"use strict";

function doTheThing() {
    document.getElementById("squareCircle").addEventListener("click", transform);
}

function transform() {
    let shape = document.getElementById("squareCircle").classList;
    if (shape[0] === "square") {
        shape.add("circle");
        shape.remove("square");
    } else {
        shape.add("square");
        shape.remove("circle");
    }
}