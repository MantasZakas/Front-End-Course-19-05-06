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
    var d = Math.sqrt (h ** 2 + w ** 2);
    return Math.round (d * 1000) / 1000;  //round up to 3 decimal places
}

function calculate () {
    var h = document.getElementById("height").value;
    var w = document.getElementById("width").value;
    document.getElementById("perimeter").innerHTML = perimeter(h, w);
    document.getElementById("area").innerHTML = area(h, w);
    document.getElementById("diagonal").innerHTML = diagonal(h, w);
    document.getElementById("rectangle").style.height = (h + "px");
    document.getElementById("rectangle").style.width = (w + "px");
}