var carData = []; //array with data and html for each car
var entryNumber = 0; //id number for each car entry
const EDIT = "edit-button"; //identifying class tag for js generated buttons
const DELETE = "delete-button"; // same here

$(document).ready(function () {
    $("#save").click(function () {
        processData();
    });
    $(document).on('click', '.btn-sm', function (ev) {
        dynamicButtonActivation(ev);
    })
});

function processData() {
    entryNumber++;
    let newCar = {
        entryId: entryNumber,
        plateNo: $("#plate_no").val(),
        distance: $("#distance").val(),
        time: $("#time").val(),
    };
    newCar.speed = Math.round(newCar.distance / newCar.time * 3.6); //calculate the speed
    newCar.HTML = '<tr id="' + entryNumber + '"' + //create id depending on the id number
        '><td>' + newCar.plateNo + //construct html for a table row with data and buttons
        '</td><td>' + newCar.distance +
        '</td><td>' + newCar.time +
        '</td><td>' + newCar.speed +
        '</td><td><button type="button" class="btn btn-secondary btn-sm ' + EDIT + '">Edit</button></td>' +
        '<td><button type="button" class="btn btn-secondary btn-sm ' + DELETE + '">Delete</button></td></tr>';
    $("input").val(""); //remove entered values from inputs TODO might need to move this
    $("tbody").append(newCar.HTML);
    carData.push(newCar);
}

function dynamicButtonActivation(ev) {
    // console.log(ev.target);
    // console.log(ev.target.parentElement);
    // console.log(ev.target.classList);
    // console.log(ev.target.classList.toString().indexOf(EDIT));
    let buttonClasses = ev.target.classList.toString();
    // console.log(ev.target.parentElement);
    // console.log(ev.target.parentElement.parentElement.id);

    if (buttonClasses.indexOf(EDIT) + 1) {
        editEntry(ev);
    } else if (buttonClasses.indexOf(DELETE) + 1) {
        deleteEntry(ev);

    }
}

function editEntry(ev) {

}

function deleteEntry(ev) {
    if (confirm("Are you sure?")) {
        // console.log("oh no...");
        let carId = ev.target.parentElement.parentElement.id;
        carData.forEach(function (entry, index) {
            // console.log(entry);
            // console.log(entry.entryId);
            // console.log(index);
            // console.log(carId);
            // console.log((carId == entry.entryId));
            if (carId == entry.entryId) {
                console.log(carData);
                console.log(index);
                console.log(entry);
                carData.splice(index, 1); //delete relevant entry for the main data array
            }
        });
        // carData.splice(carId, carId + 1);
        ev.target.parentElement.parentElement.innerHTML = ""; //delete a row of the table
        console.log(carData);
    }
}

//TODO bind edit and delete buttons to the tr they are in