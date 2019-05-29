function reset() {
    document.getElementById("equilateral").className = "text-muted";
    document.getElementById("isosceles").className = "text-muted";
    document.getElementById("right").className = "text-muted";
    document.getElementById("area").innerHTML = "";
}
function validate(sides) {
    if (sides[2] - sides[1] - sides[0] <= 0) { //triangle with area of 0 or less
        return false;
    }
    function positive(value) {
        return value > 0;
    }
    return sides.every(positive);
}
function checkSides(sides) { //check if triangle is equilateral, isosceles or right
    if (sides[0] === sides[1] && sides[1] === sides[2]) {
        document.getElementById("equilateral").className = "text-success";
        document.getElementById("isosceles").className = "text-danger";
    } else {
        document.getElementById("equilateral").className = "text-danger";
        if (sides[0] === sides[1] || sides[1] === sides[2]) {
            document.getElementById("isosceles").className = "text-success";
        } else {
            document.getElementById("isosceles").className = "text-danger";
        }
    }
    if (sides[2] ** 2 === sides[0] ** 2 + sides[1] ** 2) {
        document.getElementById("right").className = "text-success";
    } else {
        document.getElementById("right").className = "text-danger";
    }
}
function area(sides) { //calculate area with Heron's formula
    var a = (sides[0] + sides[1] + sides [2]) / 2;
    a = Math.sqrt (a * (a - sides[0]) * (a - sides[1]) * (a - sides[2]));
    document.getElementById("area").innerHTML = a;
}
function calculate() {
    reset();
    var sides = [parseFloat(document.getElementById("side_a").value)];
    sides.push(parseFloat(document.getElementById("side_b").value));
    sides.push(parseFloat(document.getElementById("side_c").value));
    sides.sort(); //sorts array by item size
    if (! validate(sides)) {
        return //TODO add error message
    }
    checkSides(sides);
    area(sides);
}
