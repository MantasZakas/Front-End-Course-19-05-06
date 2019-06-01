var player = "white";

function prepare() {  //prepare the board and pieces
    // unblockSquares();
    prepPieces();
    addEventListener("mousedown", identifyPiece);
    // addEventListener("mouseup", function(){
    //     console.log("mouse up")
    // });
    // addEventListener("click", function(){
    //     console.log("click")
    // });

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
    takePiece(ev, player);  //remove a piece if it is in the square
    blockSquares();  //block off all squares upon dropping a piece
}

//GENERAL MOVEMENT FUNCTIONS END

// function blockTakenSquares() {
//     for (var i = 0; i < document.getElementsByClassName("piece").lengths; i++) {
//         document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondrop", ""); //make all squares where pieces are undropable
//         document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondragover", "");
//     }
// }
// function unblockSquares() {
//     for (var i = 0; i < 64; i++) {
//         document.getElementsByClassName("square")[i].setAttribute("ondrop", "drop(event)");
//         document.getElementsByClassName("square")[i].setAttribute("ondragover", "allowDrop(event)");
//     }
// }
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
    preventFriendlyFire(ev, squareData);
    // unblockSquares();
}

function identifySquare(ev) {  //get quare coordinates and piece color
    var squarePlace = ev.target.parentElement.getAttribute("class");
    if (squarePlace) { //stop errors from happening when clicking on an empty square
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
}

//PIECE MOVEMENT FUNCTIONS BEGIN

function movementKing(ev, squareData) {
    var col = squareData.col;
    var row = squareData.row;
    var possibleCoordinates = [[col + 1, row], [col + 1, row - 10], [col, row - 10], [col - 1, row - 10],
        [col - 1, row], [col - 1, row + 10], [col, row + 10], [col + 1, row + 10]]; //all 8 moves a knight can make
    validateAndActivateCoordinates(ev, possibleCoordinates);
}

function movementRook(ev, squareData) {
    var col = squareData.col;
    var row = squareData.row;
    var possibleCoordinates = [];
    for (var i = 1 + col; i < 9; i++) {  //find all squares right of the rook
        possibleCoordinates.push([i, row]);
        if (document.getElementsByClassName((i + " " + row))[0].innerHTML.search("piece") + 1) { //breaks loop if finds a piece in the way
            break;
        }
    }
    for (i = -1 + col; i > 0; i = i - 1) {  //left
        possibleCoordinates.push([i, row]);
        if (document.getElementsByClassName((i + " " + row))[0].innerHTML.search("piece") + 1) {
            break;
        }
    }
    for (i = 10 + row; i < 90; i = i + 10) {  //above
        possibleCoordinates.push([col, i]);
        if (document.getElementsByClassName((col + " " + i))[0].innerHTML.search("piece") + 1) {
            break;
        }
    }
    for (i = -10 + row; i > 0; i = i - 10) {  //below
        possibleCoordinates.push([col, i]);
        if (document.getElementsByClassName((col + " " + i))[0].innerHTML.search("piece") + 1) {
            break;
        }
    }
    validateAndActivateCoordinates(ev, possibleCoordinates);
}

function movementBishop(ev, squareData) {
    var col = squareData.col;
    var row = squareData.row;
    var possibleCoordinates = [];
    for (var i = 1 + col, j = 10 + row; i < 9 && j < 90; i++, j = j + 10) {
        possibleCoordinates.push([i, j]);
        if (document.getElementsByClassName((i + " " + j))[0].innerHTML.search("piece") + 1) {
            break;
        }
    }
    for (i = -1 + col, j = -10 + row; i > 0 && j > 0; i = i - 1, j = j - 10) {
        possibleCoordinates.push([i, j]);
        if (document.getElementsByClassName((i + " " + j))[0].innerHTML.search("piece") + 1) {
            break;
        }
    }
    for (i = -1 + col, j = 10 + row; i > 0 && j < 90; i = i - 1, j = j + 10) {
        possibleCoordinates.push([i, j]);
        if (document.getElementsByClassName((i + " " + j))[0].innerHTML.search("piece") + 1) {
            break;
        }
    }
    for (i = 1 + col, j = -10 + row; i < 9 && j > 0; i++, j = j - 10) {
        possibleCoordinates.push([i, j]);
        if (document.getElementsByClassName((i + " " + j))[0].innerHTML.search("piece") + 1) {
            break;
        }
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
        if (row === 20) { //white pawns start in this row
            possibleCoordinates.push([col, row + 20]); //if white pawn didn't move before, let it move 2 squares
        }
    } else { //black pawn
        possibleCoordinates = [[col, row - 10]];
        if (row === 70) { //black pawns start in this row
            possibleCoordinates.push([col, row - 20]);
        }
    }
    validateAndActivateCoordinates(ev, possibleCoordinates);
}

//PIECE MOVEMENT FUNCTIONS BEGIN

function validateAndActivateCoordinates(ev, possibleCoordinates) {
    var coordinates = [];
    possibleCoordinates.forEach(function (square) {
        if (square[0] > 0 && square[0] < 9 && square[1] > 9 && square[1] < 81) { //if possible coordinates coordinate is inside the board
            coordinates.push(square);
        }
    });
    coordinates.forEach(function (square) {
        document.getElementsByClassName((square[0] + " " + square[1]))[0].setAttribute("ondrop", "drop(event)"); //dual class selection
        document.getElementsByClassName((square[0] + " " + square[1]))[0].setAttribute("ondragover", "allowDrop(event)");
    });
}

function preventFriendlyFire(ev, squareData) {
    if (squareData) {  //stop errors from happening when clicking on an empty square
        var otherPieceColor = "";
        for (var i = 0; i < 64; i++) {
            if (document.getElementsByClassName("square")[i].firstElementChild) { //if square has a piece in it
                otherPieceColor = document.getElementsByClassName("square")[i].firstElementChild.getAttribute("class");
                otherPieceColor = otherPieceColor.slice(6, 11); //extract the color of the piece in the square
                if (otherPieceColor === squareData.color) {
                    // document.getElementsByClassName("square")[i].style.background = ("red");
                    document.getElementsByClassName("square")[i].setAttribute("ondrop", null);
                    document.getElementsByClassName("square")[i].setAttribute("ondragover", null);
                }
            }
        }
    }
}

function takePiece(ev, player) { //TODO string slice depends on characters in id
    var square = ev.target.parentElement.parentElement;
    if (square.getAttribute("class")) { //stops console errors
        if (square.getAttribute("class").indexOf("square") + 1) {
            var squareHTML = ev.target.parentElement.parentElement.innerHTML;
            squareHTML = squareHTML.slice(squareHTML.indexOf(player) - 30, squareHTML.indexOf(player) + 96); //cut HTML text and leave only one piece div
            square.innerHTML = (squareHTML);
        }
    } else {
        square = ev.target.parentElement;
    } if (square.getAttribute("class")) { //TODO tidy this up with a separate function
        if (square.getAttribute("class").indexOf("square") + 1) {
            squareHTML = ev.target.parentElement.innerHTML;
            squareHTML = squareHTML.slice(squareHTML.indexOf(player) - 30, squareHTML.indexOf(player) + 96);
            square.innerHTML = (squareHTML);
        }
    } else {
        square = ev.target;
    } if (square.getAttribute("class")) {
        if (square.getAttribute("class").indexOf("square") + 1) {
            squareHTML = ev.target.innerHTML;
            squareHTML = squareHTML.slice(squareHTML.indexOf(player) - 30, squareHTML.indexOf(player) + 96);
            square.innerHTML = (squareHTML);
        }
    }
}

//PIECE MOVEMENT FUNCTIONS END



function test(x, y) {
    var col = x;
    var row = y;
    var possibleCoordinates = [[x + 2, y - 10], [x + 2, y + 10], [x - 2, y - 10], [x - 2, y + 10],
        [x + 1, y + 20], [x - 1, y + 20], [x + 1, y - 20], [x - 1, y - 20]]; //all 8 moves a knight can make
    console.log(possibleCoordinates.toString());
    var coordinates = [];
    possibleCoordinates.forEach(function (square) {
        if (square[0] > 0 && square[0] < 9 && square[1] > 9 && square[1] < 81) { //if possible coordinates coordinate is inside the board
            coordinates.push(square);
        }
    });
    console.log(coordinates.toString());
}

// function movementBishop(ev, squareData) {
//     var col = squareData.col;
//     var row = squareData.row;
//     for (var possibleCoordinates = []; col < 9 && row < 90; col++, row = row + 10) {
//         possibleCoordinates.push([col, row]); //construct an array with all coordinates reachable by the bishop
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (possibleCoordinates; col > 0 && row > 0; col= col - 1, row = row - 10) {
//         possibleCoordinates.push([col, row]);
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (possibleCoordinates; col > 0 && row < 90; col= col - 1, row = row + 10) {
//         possibleCoordinates.push([col, row]);
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (possibleCoordinates; col < 9 && row > 0; col++, row = row - 10) {
//         possibleCoordinates.push([col, row]);
//     }
//     validateAndActivateCoordinates(ev, possibleCoordinates);
// }

//     // document.getElementsByClassName(x)[((y / 10) + 2)].style.background = ("red");  //dual class selection
//
//     // document.getElementsByClassName('4 30')[0].style.background = ("red");  //dual class selection

// correct solution for searching for 2 class search with variables
// document.getElementsByClassName('4 30')[0].style.background = (class1 + " " + class2);  //dual class selection


// addEventListener("click", function () {console.log("mouse up")});
// addEventListener("click", function () {console.log("unclick")});


// function movementBishop(ev, squareData) {
//     var col = squareData.col;
//     var row = squareData.row;
//     for (var possibleCoordinates = []; col < 9 && row < 90; col++, row = row + 10) {
//         possibleCoordinates.push([col, row]); //construct an array with all coordinates reachable by the bishop
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (possibleCoordinates; col > 0 && row > 0; col= col - 1, row = row - 10) {
//         possibleCoordinates.push([col, row]);
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (possibleCoordinates; col > 0 && row < 90; col= col - 1, row = row + 10) {
//         possibleCoordinates.push([col, row]);
//     }
//     col = squareData.col;
//     row = squareData.row;
//     for (possibleCoordinates; col < 9 && row > 0; col++, row = row - 10) {
//         possibleCoordinates.push([col, row]);
//     }
//     validateAndActivateCoordinates(ev, possibleCoordinates);
// }

//     // document.getElementsByClassName(x)[((y / 10) + 2)].style.background = ("red");  //dual class selection
//
//     // document.getElementsByClassName('4 30')[0].style.background = ("red");  //dual class selection

// correct solution for searching for 2 class search with variables
// document.getElementsByClassName('4 30')[0].style.background = (class1 + " " + class2);  //dual class selection





// addEventListener("click", function () {console.log("mouse up")});
// addEventListener("click", function () {console.log("unclick")});



// var childcount = document.getElementById("parent")
//     .getElementsByClassName("one")
//     .length;




// var x = document.getElementById("test").parentElement.nodeName;
// var x = document.getElementsByClassName("intro");



// document.querySelectorAll("p.intro")


// function clickMeEvent(obj) {
//     if (obj.innerHTML == "Click Me") {
//         obj.innerHTML = "Click Me<br>Click Me Again";
//         return;
//     }
//     if (obj.innerHTML == "Click Me<br>Click Me Again") {
//         obj.innerHTML = "Thank You";
//         return;
//     }
//     if (obj.innerHTML == "Thank You") {
//         obj.innerHTML = "Goodbye";
//         return;
//     }
//     if (obj.innerHTML == "Goodbye") {
//         obj.style.display = "none";
//         return;
//     }
// }


// document.getElementById("test").setAttribute("ondrop", "drop(event)");
// document.getElementById("test").setAttribute("ondragover", "allowDrop(event)");
// document.getElementById("queen2").draggable = "true";
// console.log(document.getElementsByClassName("piece").parentElement.nodeName);


// var x = document.table["chess"];
// var text = "";
// var i;
// for (i = 0; i < x.length ;i++) {
//     text += "A";
// }
// console.log(text);
// var x = document.querySelectorAll(td);
// x[0].style.backgroundColor = "blue";


// console.log(document.getElementById("queen1").parentElement);
// console.log(document.getElementsByClassName("white")[0].parentElement);
// console.log(document.querySelectorAll("div.piece")[0].parentElement);