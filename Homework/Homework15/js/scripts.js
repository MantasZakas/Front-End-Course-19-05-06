function prepare() {  //prepare the board and pieces
    // unblockSquares();
    prepPieces();
}
function prepPieces() {
    for (var i = 0; i < document.getElementsByClassName("piece").length; i++) {  //count the number of pieces on board and make them draggable
        document.getElementsByClassName("piece")[i].setAttribute("draggable", "true");
        document.getElementsByClassName("piece")[i].setAttribute("ondragstart", "drag(event)");
    }
    for (i = 0; i < document.getElementsByClassName("king").length; i++) {  //count the number of kings on board and add icons into them
        document.getElementsByClassName("king")[i].innerHTML = '<i class="fas fa-chess-king"></i>';
    }
    for (i = 0; i < document.getElementsByClassName("queen").length; i++) {
        document.getElementsByClassName("queen")[i].innerHTML = '<i class="fas fa-chess-queen"></i>';
    }
    for (i = 0; i < document.getElementsByClassName("rook").length; i++) {
        document.getElementsByClassName("rook")[i].innerHTML = "<i class=\"fas fa-chess-rook\"></i>";
    }
    for (i = 0; i < document.getElementsByClassName("bishop").length; i++) {
        document.getElementsByClassName("bishop")[i].innerHTML = "<i class=\"fas fa-chess-bishop\"></i>";
    }
    for (i = 0; i < document.getElementsByClassName("knight").length; i++) {
        document.getElementsByClassName("knight")[i].innerHTML = "<i class=\"fas fa-chess-knight\"></i>";
    }
    for (i = 0; i < document.getElementsByClassName("pawn").length; i++) {
        document.getElementsByClassName("pawn")[i].innerHTML = "<i class=\"fas fa-chess-pawn\"></i>";
    }
}

//GENERAL MOVEMENT FUNCTIONS BEGIN

function drag(ev) {  //pick up piece
    ev.dataTransfer.setData("text", ev.target.id);
    // blockTakenSquares();  //stop pieces from being put on taken squares
}
function allowDrop(ev) {  //drag
    ev.preventDefault();
}
function drop(ev) {  //drop piece
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    // unblockSquares();  //reset dropping on all squares
    blockSquares();  //block off all squares upon dropping a piece
}

//GENERAL MOVEMENT FUNCTIONS END

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
        movementKing(ev, squareData);
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
        movementKnight(ev, squareData);
    }
    if (pieceType.search("pawn") + 1) {
        movementPawn(ev, squareData);
    }
    // unblockSquares();
}
function identifySquare(ev) {  //get quare coordinates and piece color
    var squarePlace = ev.target.parentElement.getAttribute("class");
    if (squarePlace.search("square") + 1) {  //this works if person clicked on div class piece
    } else {
        squarePlace = ev.target.parentElement.parentElement.getAttribute("class");
    }
    var pieceColor = ev.target.getAttribute("class");
    if (pieceColor.search("piece") + 1) {
    } else {
        pieceColor = ev.target.parentElement.getAttribute("class")
    }
    pieceColor = pieceColor.slice(6, 11);
    return {col: parseInt(squarePlace.slice(7, 8)), row: parseInt(squarePlace.slice(9, 11)), color: pieceColor}  //returns object with coordinates of square and color of piece
}

//PIECE MOVEMENT FUNCTIONS BEGIN

function movementKing(ev, squareData) {
    var col = squareData.col;
    var row = squareData.row;
    var possibleCoordinates = [[col + 1, row], [col + 1, row - 10], [col, row - 10], [col - 1, row - 10],
        [col - 1, row], [col - 1, row + 10], [col, row + 10], [col + 1, row + 10]]; //all 8 moves a knight can make
    validateAndActivateCoordinates(ev, possibleCoordinates);
}
function movementRook(ev, squareData) {  //TODO remake with validateAndActivateCoordinates
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
    for (var possibleCoordinates = []; col < 9 && row < 90; col++, row = row + 10) {
        possibleCoordinates.push([col, row]); //construct an array with all coordinates reachable by the bishop
    }
    col = squareData.col;
    row = squareData.row;
    for (possibleCoordinates; col > 0 && row > 0; col= col - 1, row = row - 10) {
        possibleCoordinates.push([col, row]);
    }
    col = squareData.col;
    row = squareData.row;
    for (possibleCoordinates; col > 0 && row < 90; col= col - 1, row = row + 10) {
        possibleCoordinates.push([col, row]);
    }
    col = squareData.col;
    row = squareData.row;
    for (possibleCoordinates; col < 9 && row > 0; col++, row = row - 10) {
        possibleCoordinates.push([col, row]);
    }
    validateAndActivateCoordinates(ev, possibleCoordinates);
}
function movementQueen(ev, squareData) {
    movementRook(ev, squareData);
    movementBishop(ev, squareData);
}
function movementKnight(ev, squareData) {
    var col = squareData.col;
    var row = squareData.row;
    var possibleCoordinates = [[col + 2, row - 10], [col + 2, row + 10], [col - 2, row - 10], [col - 2, row + 10],
        [col + 1, row + 20], [col - 1, row + 20], [col + 1, row - 20], [col - 1, row - 20]]; //all 8 moves a knight can make
    validateAndActivateCoordinates(ev, possibleCoordinates);
}
function movementPawn(ev, squareData) {
    var col = squareData.col;
    var row = squareData.row;
    var possibleCoordinates = [];
    if (squareData.color === "white") {
        possibleCoordinates = [[col, row + 10]];
        if (row === 20) {
            possibleCoordinates.push([col, row + 20]); //if white pawn didn't move before, let it move 2 squares
        }
    } else {
        possibleCoordinates = [[col, row - 10]];
        if (row === 70) {
            possibleCoordinates.push([col, row - 20]);
        }
    }
    validateAndActivateCoordinates(ev, possibleCoordinates);
}
function validateAndActivateCoordinates(ev, possibleCoordinates) {
    var coordinates = [];
    possibleCoordinates.forEach(function(square){
        if (square[0] > 0 && square[0] < 9 && square[1] > 9 && square[1] < 81) { //if possible coordinates coordinate is inside the board
            coordinates.push(square);
        }
    });
    coordinates.forEach(function(square){
        document.getElementsByClassName((square[0] + " " + square[1]))[0].setAttribute("ondrop", "drop(event)"); //dual class selection
        document.getElementsByClassName((square[0] + " " + square[1]))[0].setAttribute("ondragover", "allowDrop(event)");
    });
}


//PIECE MOVEMENT FUNCTIONS END


addEventListener("mousedown", identifyPiece);


function test(x, y) {
    var col = x;
    var row = y;
    var possibleCoordinates = [[x + 2, y - 10], [x + 2, y + 10], [x - 2, y - 10], [x - 2, y + 10],
        [x + 1, y + 20], [x - 1, y + 20], [x + 1, y - 20], [x - 1, y - 20]]; //all 8 moves a knight can make
    console.log(possibleCoordinates.toString());
    var coordinates = [];
    possibleCoordinates.forEach(function(square){
        if (square[0] > 0 && square[0] < 9 && square[1] > 9 && square[1] < 81) { //if possible coordinates coordinate is inside the board
            coordinates.push(square);
        }
    });
    console.log(coordinates.toString());
}

// function movementBishop(ev, squareData) {
//     var col = squareData.col;
//     var row = squareData.row;
//     for (var arr = []; col < 9 && row < 90; col++, row = row + 10) {
//         arr.push([col, row]); //construct an array with all coordinates reachable by the bishop
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (arr; col > 0 && row > 0; col= col - 1, row = row - 10) {
//         arr.push([col, row]);
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (arr; col > 0 && row < 90; col= col - 1, row = row + 10) {
//         arr.push([col, row]);
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (arr; col < 9 && row > 0; col++, row = row - 10) {
//         arr.push([col, row]);
//     }
//     arr.forEach(function(coordinates) {
//         col = coordinates[0].toString();
//         row = 8 - (coordinates[1] / 10); //turn row class into array index
//         row = row.toString();
//         document.getElementsByClassName(col)[row].setAttribute("ondrop", "drop(event)");
//         document.getElementsByClassName(col)[row].setAttribute("ondragover", "allowDrop(event)");
//     });
// }

//     // document.getElementsByClassName(x)[((y / 10) + 2)].style.background = ("red");  //dual class selection
//
//     // document.getElementsByClassName('4 30')[0].style.background = ("red");  //dual class selection

// correct solution for searching for 2 class search with variables
// document.getElementsByClassName('4 30')[0].style.background = (class1 + " " + class2);  //dual class selection





// addEventListener("click", function () {console.log("mouse up")});
// addEventListener("click", function () {console.log("unclick")});
