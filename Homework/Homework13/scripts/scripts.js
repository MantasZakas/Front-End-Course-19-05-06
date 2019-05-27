function check (x) {
    if (x <0) {
        return 0;
    } else {
        return x;
    }
}
function perimeter (h, w) {
    if (h > 0 && w > 0) {
        return  2 * h + 2 * w;
    } else {
        return 0;
    }
}
function area (h, w) {
    return h * w;
}
function diagonal (h, w) {
    if (h > 0 && w > 0) {
        return Math.sqrt (h ** 2 + w ** 2);
    } else {
        return 0;
    }
}
function calculate (){
    var h = parseFloat(document.getElementById("height").value); //get value as number
    var w = parseFloat(document.getElementById("width").value);
    var dimentions = [h, w];
    var dimentionsChecked = dimentions.map(check); //check for negative numbers
    if (dimentions[0] !== dimentionsChecked[0] || dimentions[1] !== dimentionsChecked[1]) {
        alert("Enter a valid number");
        dimentionsChecked = [0, 0];
    }
    document.getElementById("perimeter").innerHTML = perimeter (dimentionsChecked[0], dimentionsChecked[1]);
    document.getElementById("area").innerHTML = area (dimentionsChecked[0], dimentionsChecked[1]);
    document.getElementById("diagonal").innerHTML = diagonal (dimentionsChecked[0], dimentionsChecked[1]);
    document.getElementById("rectangle").style.height = (h + "px"); //draw the rectangle
    document.getElementById("rectangle").style.width = (w + "px");
}