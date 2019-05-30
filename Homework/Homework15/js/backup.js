function prepare() {  //prepare the board and pieces
    unblockTakenSquares();
    prepPieces();
}
function prepPieces() {
    for (var i = 0; i < document.getElementsByClassName("piece").length; i++) {  //count the number of pieces on board and make them draggable
        document.getElementsByClassName("piece")[i].setAttribute("draggable", "true");
        document.getElementsByClassName("piece")[i].setAttribute("ondragstart", "drag(event)");
    }
    for (var i = 0; i < document.getElementsByClassName("king").length; i++) {  //count the number of kings on board and add icons into them
        document.getElementsByClassName("king")[i].innerHTML='<i class="fas fa-chess-king"></i>';
    }
    for (var i = 0; i < document.getElementsByClassName("queen").length; i++) {
        document.getElementsByClassName("queen")[i].innerHTML='<i class="fas fa-chess-queen"></i>';
    }
    for (var i = 0; i < document.getElementsByClassName("rook").length; i++) {
        document.getElementsByClassName("rook")[i].innerHTML="<i class=\"fas fa-chess-rook\"></i>";
    }
    for (var i = 0; i < document.getElementsByClassName("bishop").length; i++) {
        document.getElementsByClassName("bishop")[i].innerHTML="<i class=\"fas fa-chess-bishop\"></i>";
    }
    for (var i = 0; i < document.getElementsByClassName("knight").length; i++) {
        document.getElementsByClassName("knight")[i].innerHTML="<i class=\"fas fa-chess-knight\"></i>";
    }
    for (var i = 0; i < document.getElementsByClassName("pawn").length; i++) {
        document.getElementsByClassName("pawn")[i].innerHTML="<i class=\"fas fa-chess-pawn\"></i>";
    }
}
//MOVEMENT FUNCTIONS BEGIN
function drag(ev) {  //pick up piece
    ev.dataTransfer.setData("text", ev.target.id);
    blockTakenSquares();  //stop pieces from being put on taken squares
}
function allowDrop(ev) {  //drag
    ev.preventDefault();
}
function drop(ev) {  //drop piece
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    unblockTakenSquares();  //reset dropping on all squares
}
//MOVEMENT FUNCTIONS END
function blockTakenSquares() {
    for (var i = 0; i < document.getElementsByClassName("piece").lengths; i++) {
        document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondrop", ""); //make all squares where pieces are undropable
        document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondragover", "");
    }
}
function unblockTakenSquares() {
    for (var i = 0; i < 64; i++) {
        document.getElementsByClassName("square")[i].setAttribute("ondrop", "drop(event)");
        document.getElementsByClassName("square")[i].setAttribute("ondragover", "allowDrop(event)");
    }
}
function test () {
    var counter = document.getElementsByClassName("piece").length;
    console.log(counter);
}



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