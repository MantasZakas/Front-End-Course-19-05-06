function prepare() {  //prepare the board and pieces
    // unblockSquares();
    prepPieces();
}
function prepPieces() {
    for (var i = 0; i < document.getElementsByClassName("piece").length; i++) {  //count the number of pieces on board and make them draggable
        document.getElementsByClassName("piece")[i].setAttribute("draggable", "true");
        document.getElementsByClassName("piece")[i].setAttribute("ondragstart", "drag(event)");
    }
    for (var i = 0; i < document.getElementsByClassName("king").length; i++) {  //count the number of kings on board and add icons into them
        document.getElementsByClassName("king")[i].innerHTML = '<i class="fas fa-chess-king"></i>';
    }
    for (var i = 0; i < document.getElementsByClassName("queen").length; i++) {
        document.getElementsByClassName("queen")[i].innerHTML = '<i class="fas fa-chess-queen"></i>';
    }
    for (var i = 0; i < document.getElementsByClassName("rook").length; i++) {
        document.getElementsByClassName("rook")[i].innerHTML = "<i class=\"fas fa-chess-rook\"></i>";
    }
    for (var i = 0; i < document.getElementsByClassName("bishop").length; i++) {
        document.getElementsByClassName("bishop")[i].innerHTML = "<i class=\"fas fa-chess-bishop\"></i>";
    }
    for (var i = 0; i < document.getElementsByClassName("knight").length; i++) {
        document.getElementsByClassName("knight")[i].innerHTML = "<i class=\"fas fa-chess-knight\"></i>";
    }
    for (var i = 0; i < document.getElementsByClassName("pawn").length; i++) {
        document.getElementsByClassName("pawn")[i].innerHTML = "<i class=\"fas fa-chess-pawn\"></i>";
    }
}
//MOVEMENT FUNCTIONS BEGIN
function drag(ev) {  //pick up piece
    ev.dataTransfer.setData("text", ev.target.id);
    // console.log("Picked up");
    // blockTakenSquares();  //stop pieces from being put on taken squares
}
function allowDrop(ev) {  //drag
    ev.preventDefault();
}
function drop(ev) {  //drop piece
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    // console.log("Dropped");
    // unblockSquares();  //reset dropping on all squares
    blockSquares();  //block off all squares upon dropping a piece
}
//MOVEMENT FUNCTIONS END
function blockTakenSquares() {
    for (var i = 0; i < document.getElementsByClassName("piece").lengths; i++) {
        document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondrop", ""); //make all squares where pieces are undropable
        document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondragover", "");
    }
}
function unblockSquares() {
    for (var i = 0; i < 64; i++) {
        document.getElementsByClassName("square")[i].setAttribute("ondrop", "drop(event)");
        document.getElementsByClassName("square")[i].setAttribute("ondragover", "allowDrop(event)");
    }
}
function blockSquares() {
    for (var i = 0; i < 64; i++) {
        document.getElementsByClassName("square")[i].setAttribute("ondrop", "");
        document.getElementsByClassName("square")[i].setAttribute("ondragover", "");
    }
}
function identifyPiece(ev) {
    var pieceType = ev.target.getAttribute("class");
    var squareData = identifySquare(ev);  //find position of square by getting the class
    if (pieceType.search("king") + 1) {
    }
    if (pieceType.search("queen") + 1) {
        movementQueen(ev, squareData);

    }
    if (pieceType.search("rook") + 1) {
        movementRook(ev, squareData);
    }
    if (pieceType.search("bishop") + 1) {
        movementBishop(ev, squareData);
    }
    if (pieceType.search("knight") + 1) {
    }
    if (pieceType.search("pawn") + 1) {
    }
    // unblockSquares();
    // console.log(pieceType);
}
function identifySquare(ev) {
    var squarePlace = ev.target.parentElement.getAttribute("class");
    if (squarePlace.search("square") + 1) {  //this works if person clicked on div class piece
    } else {
        squarePlace = ev.target.parentElement.parentElement.getAttribute("class");
        if (squarePlace.search("square") + 1) {  //this works if person clicked on icon inside div class piece
        } else {
            return null;
        }
    }
    var squareData = {col: parseInt(squarePlace.slice(7, 8)), row: parseInt(squarePlace.slice(9, 11))};
    console.log(squareData);
    return squareData  //returns object with coordinates of square
}
function movementRook(ev, squareData) {
    var col = squareData.col.toString();
    var row = squareData.row.toString();
    for (var i = 0; i < 8; i++) {  //enable full row and column for movement, where the rook is
        document.getElementsByClassName(col)[i].setAttribute("ondrop", "drop(event)");
        document.getElementsByClassName(col)[i].setAttribute("ondragover", "allowDrop(event)");
        document.getElementsByClassName(row)[i].setAttribute("ondrop", "drop(event)");
        document.getElementsByClassName(row)[i].setAttribute("ondragover", "allowDrop(event)");
    }
}
function movementBishop(ev, squareData) {
    var col = squareData.col;
    var row = squareData.row;
    for (var arr = []; col < 9 && row < 90; col++, row = row + 10) {
        arr.push([col, row]); //construct an array with all coordinates reachable by the bishop
    }
    col = squareData.col;
    row = squareData.row;
    for (arr; col > 0 && row > 0; col= col - 1, row = row - 10) {
        arr.push([col, row]);
    }
    col = squareData.col;
    row = squareData.row;
    for (arr; col > 0 && row < 90; col= col - 1, row = row + 10) {
        arr.push([col, row]);
    }
    col = squareData.col;
    row = squareData.row;
    for (arr; col < 9 && row > 0; col++, row = row - 10) {
        arr.push([col, row]);
    }
    console.log(arr.toString());
    arr.forEach(function(coordinates) {
        col = coordinates[0].toString();
        row = 8 - (coordinates[1] / 10); //turn row class into array index
        row = row.toString();
        console.log(col, row);
        // document.getElementsByClassName(col)[row].style.background = ("red");  //dual class selection
        document.getElementsByClassName(col)[row].setAttribute("ondrop", "drop(event)");
        document.getElementsByClassName(col)[row].setAttribute("ondragover", "allowDrop(event)");
    });
}
function movementQueen(ev, squareData) {
    movementRook(ev, squareData);
    movementBishop(ev, squareData);
}

addEventListener("mousedown", identifyPiece);






// function test(x, y) {
//     var col = x;
//     var row = y;
//     for (var arr = []; col < 9 && row < 90; col++, row = row + 10) {
//         arr.push([col, row]); //construct an array with all coordinates reachable by the bishop
//     }
//     col = x;
//     row = y;
//     for (arr; col > 0 && row > 0; col= col - 1, row = row - 10) {
//         arr.push([col, row]);
//     }
//     col = x;
//     row = y;
//     for (arr; col > 0 && row < 90; col= col - 1, row = row + 10) {
//         arr.push([col, row]);
//     }
//     col = x;
//     row = y;
//     for (arr; col < 9 && row > 0; col++, row = row - 10) {
//         arr.push([col, row]);
//     }
//     console.log(arr.toString());
//     arr.forEach(function(coordinates) {
//         col = coordinates[0];
//         row = coordinates[1];
//         console.log(col, row);
//         document.getElementsByClassName(col)[8 - (row / 10)].style.background = ("red");  //dual class selection
//     });
//
//     // document.getElementsByClassName(x)[((y / 10) + 2)].style.background = ("red");  //dual class selection
//
//     // document.getElementsByClassName('4 30')[0].style.background = ("red");  //dual class selection
// }



// addEventListener("click", function () {console.log("mouse up")});
// addEventListener("click", function () {console.log("unclick")});
