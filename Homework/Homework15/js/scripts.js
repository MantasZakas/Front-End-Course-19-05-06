function allowDrop(ev) {  //drag
    ev.preventDefault();
    console.log("AAA");
}
function drag(ev) {  //begin dragging
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("BBB");
    blockTakenSquares();  //stop pieces from being put on taken squares
}
function drop(ev) {  //stop dragging
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log("CCC");
    // console.log(document.getElementById("queen1").parentElement);
    // console.log(document.getElementsByClassName("white")[0].parentElement);
    // console.log(document.querySelectorAll("div.piece")[0].parentElement);
    unblockTakenSquares();  //reset dropping on all squares
}
function blockTakenSquares() {  //TODO put this onLoad for body
    for (var i = 0; i < 2; i++) {  //TODO set max i to number of pieces on board
        console.log(document.getElementsByClassName("piece")[i].parentElement);
        document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondrop", ""); //make all squares where pieces are undropable
        document.getElementsByClassName("piece")[i].parentElement.setAttribute("ondragover", "");
        // document.getElementsByClassName("piece")[i].parentElement.style.background = ("red");
    }
}
function unblockTakenSquares() {
    // var x = document.table["chess"];
    // var text = "";
    // var i;
    // for (i = 0; i < x.length ;i++) {
    //     text += "A";
    // }
    // console.log(text);
    // var x = document.querySelectorAll(td);
    // x[0].style.backgroundColor = "blue";
    for (var i = 0; i < 64; i++) {
        document.getElementsByClassName("square")[i].setAttribute("ondrop", "drop(event)");
        document.getElementsByClassName("square")[i].setAttribute("ondragover", "allowDrop(event)");
    }
}

function test () {
    // document.getElementById("test").setAttribute("ondrop", "drop(event)");
    // document.getElementById("test").setAttribute("ondragover", "allowDrop(event)");
    // document.getElementById("queen2").draggable = "true";
    // console.log(document.getElementsByClassName("piece").parentElement.nodeName);
    console.log(document.getElementById("test").parentElement);
    console.log(document.getElementsByClassName("piece")[0].parentElement);
    document.getElementById("start1").style.background = ("red");
    document.getElementsByClassName("piece")[0].style.background = ("green");
    unblockTakenSquares()



}

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


