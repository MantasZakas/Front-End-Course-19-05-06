function check (x) {  //check for negative numbers
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
function draw (h, w) {
    var maxLength = 400; //scale the dimensions
    if (h === 0 || w === 0) {
        document.getElementById("rectangle").style.borderRadius = ("50%"); //make a circle
        widthScaled = maxLength / 2;
        heightScaled = maxLength / 2;
    } else {
        if (h > w) {
            var widthScaled = w * maxLength / h;
            var heightScaled = maxLength;
        } else {
            heightScaled = h * maxLength / w;
            widthScaled = maxLength;
        }
    }
    document.getElementById("rectangle").style.height = (heightScaled + "px"); //draw the rectangle
    document.getElementById("rectangle").style.width = (widthScaled + "px");
}
function calculate (){
    document.getElementById("rectangle").style.borderRadius = ("0"); //reset border radius in case of previous invalid values
    var h = parseFloat(document.getElementById("height").value); //get value as number
    var w = parseFloat(document.getElementById("width").value);
    var dimensions = [h, w];
    var dimensionsChecked = dimensions.map(check); //check for negative numbers
    if (dimensions[0] !== dimensionsChecked[0] || dimensions[1] !== dimensionsChecked[1]) {
        alert("Enter a valid number");
        dimensionsChecked = [0, 0];
    }
    document.getElementById("perimeter").innerHTML = perimeter (dimensionsChecked[0], dimensionsChecked[1]);
    document.getElementById("area").innerHTML = area (dimensionsChecked[0], dimensionsChecked[1]);
    document.getElementById("diagonal").innerHTML = diagonal (dimensionsChecked[0], dimensionsChecked[1]);
    draw (dimensionsChecked[0], dimensionsChecked[1])
}