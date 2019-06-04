// var player = "white";
// var square = "";

function prepare() {  //prepare the board and pieces
    prepPieces();
    window.square = "";    //Declare global variables from inside a function
    window.player = "white"   //TODO try this out
}

function prepPieces() {
    var pieceTypes = ["king", "queen", "rook", "bishop", "knight", "pawn"];
    var playerPieces = document.getElementsByClassName(player);
    for (var i = 0; i < playerPieces.length; i++) {  //count the number of pieces on board and make them draggable
        playerPieces[i].setAttribute("draggable", "true");
        playerPieces[i].setAttribute("ondragstart", "drag(event)");
    }
    pieceTypes.forEach(function(pieceType) {
        var pieces = document.getElementsByClassName(pieceType);
        var len = pieces.length;
        for (i = 0; i < pieces.length; i++) {
            pieces[i].innerHTML = '<i class="fas fa-chess-' + pieceType + '"></i>';
        }
    });
}

//GENERAL MOVEMENT FUNCTIONS BEGIN

function drag(ev) {  //pick up piece
    blockSquares();
    ev.dataTransfer.setData("text", ev.target.id);
    identifyPiece(ev);
}

function allowDrop(ev) {  //drag
    ev.preventDefault();
}

function drop(ev) {  //drop piece
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    takePiece(ev, player);  //remove a piece if it is in the square
    blockSquares();  //block off all squares upon dropping a piece
    evolvePawn(player);
    changeTurn();
}

//GENERAL MOVEMENT FUNCTIONS END

function blockSquares() {
    var squares = document.getElementsByClassName("square");
    for (var i = 0; i < 64; i++) {
        squares[i].setAttribute("ondrop", "");
        squares[i].setAttribute("ondragover", "");
    }
}

function identifyPiece(ev) {
    var pieceType = ev.target.getAttribute("class");
    var squareData = identifySquare(ev);  //find position of square by getting the class
    if (pieceType.search("pawn") + 1) {
        movementPawn(ev, squareData);
    } else if (pieceType.search("knight") + 1) {
        movementKnight(ev, squareData);
    } else if (pieceType.search("rook") + 1) {
        movementRook(ev, squareData);
    } else if (pieceType.search("bishop") + 1) {
        movementBishop(ev, squareData);
    } else if (pieceType.search("queen") + 1) {
        movementQueen(ev, squareData);
    } else if (pieceType.search("king") + 1) {
        movementKing(ev, squareData);
    }
    preventFriendlyFire(ev, squareData);
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
    if (squareData.color === "white") { //white pawn
        if (isSquareFree(col, row + 10)) { //pawns can't take pieces when moving straight
            possibleCoordinates = [[col, row + 10]];
        }
        if (row === 20) { //white pawns start in this row
            if (isSquareFree(col, row + 20)) {
                possibleCoordinates.push([col, row + 20]); //if white pawn didn't move before, let it move 2 squares
            }
        }
        if (col - 1 > 0) {  //make sure pawn does not go out of the board
            if (!isSquareFree(col - 1, row + 10)) { //pawns can take pieces diagonally
                possibleCoordinates.push([col - 1, row + 10]);
            }
        }
        if (col + 1 < 9) {
            if (!isSquareFree(col + 1, row + 10)) {
                possibleCoordinates.push([col + 1, row + 10]);
            }
        }
    } else { //black pawn
        if (isSquareFree(col, row - 10)) {
            possibleCoordinates = [[col, row - 10]];
        }
        if (row === 70) { //black pawns start in this row
            if (isSquareFree(col, row - 20)) {
                possibleCoordinates.push([col, row - 20]);
            }
        }
        if (col - 1 > 0) {  //make sure pawn does not go out of the board
            if (!isSquareFree(col - 1, row - 10)) { //pawns can take pieces diagonally
                possibleCoordinates.push([col - 1, row - 10]);
            }
        }
        if (col + 1 < 9) {
            if (!isSquareFree(col + 1, row - 10)) {
                possibleCoordinates.push([col + 1, row - 10]);
            }
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

function isSquareFree(col, row) {
    var answer = true;
    if (document.getElementsByClassName((col + " " + row))[0].firstElementChild) {
        answer = false;
    }
    return answer;
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

function takePiece(ev, player) {
    var square = ev.target.parentElement.parentElement;
    if (square.getAttribute("class")) { //stops console errors
        if (square.getAttribute("class").indexOf("square") + 1) { //3 ifs depending on where exactly the piece is dropped (icon, piece div or square
            var squareHTML = ev.target.parentElement.parentElement.innerHTML;
            squareHTML = squareHTML.slice(squareHTML.indexOf(player) - 30, squareHTML.indexOf(player) + 96); //cut HTML text and leave only one piece div
            square.innerHTML = (squareHTML);
        }
    } else {
        square = ev.target.parentElement;
    }
    if (square.getAttribute("class")) {
        if (square.getAttribute("class").indexOf("square") + 1) {
            squareHTML = ev.target.parentElement.innerHTML;
            squareHTML = squareHTML.slice(squareHTML.indexOf(player) - 30, squareHTML.indexOf(player) + 96);
            square.innerHTML = (squareHTML);
        }
    } else {
        square = ev.target;
    }
    if (square.getAttribute("class")) {
        if (square.getAttribute("class").indexOf("square") + 1) {
            squareHTML = ev.target.innerHTML;
            squareHTML = squareHTML.slice(squareHTML.indexOf(player) - 30, squareHTML.indexOf(player) + 96);
            square.innerHTML = (squareHTML);
        }
    }
    gameWinner(); //check if game is over
}

function gameWinner() { //player wins if the opposing king cannot be found
    var winner = "";
    if (!document.getElementById("wking1")) {
        winner = "black";
    }
    if (!document.getElementById("bking1")) {
        winner = "white";
    }
    if (winner) {
        document.getElementsByTagName("table")[0].classList.add("hidden"); //hide the board
        document.getElementById("gameOver").classList.remove("hidden");
        if (winner === "white") {
            document.getElementById("gameOver").classList.add("white");
            document.getElementById("gameOver").innerHTML = ("White wins");
        }
        if (winner === "black") {
            document.getElementById("gameOver").classList.add("black");
            document.getElementById("gameOver").innerHTML = ("Black wins");
        }
    }
}

function evolvePawn(player) {
    var row = "80";
    if (player === "black") {
        row = "10";
    }
    var squares = document.getElementsByClassName(row);
    for (var i = 0; i < 8; i++) {
        if (squares[i].firstElementChild) { //if square is taken
            if (squares[i].innerHTML.indexOf(" pawn") + 1) { //if a pawn is in the square
                console.log(squares[i].innerHTML);
                squares[i].firstElementChild.innerHTML = "";
                squares[i].firstElementChild.classList.remove("pawn");
                for (var j = 0; j < 4; j++) { //color selection buttons depending on the player
                    document.getElementsByTagName("button")[j].classList.add(player);
                }
                document.getElementsByTagName("table")[0].classList.add("hidden");//hide the board
                document.getElementById("pieceSelector").classList.remove("hidden");//show the piece selector
                square = squares[i] //only one pawn can be found, so the rest of the loop does not matter
            }
        }
    }
}

function evolutionSelection(pieceType, square) { //changes pawn type and closes selection view, used in HTML
    square.firstElementChild.innerHTML = ('<i class=\"fas fa-chess-' + pieceType + '"></i>');
    square.firstElementChild.classList.add(pieceType);
    document.getElementById("pieceSelector").classList.add("hidden");
    document.getElementsByTagName("table")[0].classList.remove("hidden");
}

function changeTurn() {
    for (var i = 0; i < document.getElementsByClassName(player).length; i++) {  //count the number of pieces on board and make them draggable
        document.getElementsByClassName(player)[i].setAttribute("draggable", null);
        document.getElementsByClassName(player)[i].setAttribute("ondragstart", null);
    }
    document.getElementsByTagName("h1")[0].style.color = player;
    if (player === "white") {
        player = "black"
    } else player = "white";
    for (i = 0; i < document.getElementsByClassName(player).length; i++) {  //count the number of pieces on board and make them draggable
        document.getElementsByClassName(player)[i].setAttribute("draggable", "true");
        document.getElementsByClassName(player)[i].setAttribute("ondragstart", "drag(event)");
    }
    document.getElementById("main").style.background = player;
}

//PIECE MOVEMENT FUNCTIONS END