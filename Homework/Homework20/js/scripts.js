var carData = []; //array with data and html for each car
var entryNumber = 0; //id number for each car entry
var newEntry = false;
var entryBeingEdited = -1;
const EDIT = "edit-button"; //identifying class tag for js generated buttons
const DELETE = "delete-button"; // same here

$(document).ready(function () {
    $("#newEntryButton").click(function () {
        newEntry = true;
    });
    $("#cancel").click(function () {
        newEntry = false; //reset newEntry on cancel
        $("input").val(""); //remove entered values from inputs
    });
    $("#save").click(function () {
        if (newEntry) {
            saveNewData();
        } else {
            saveEditedData()
        }
    });
    $(document).on('click', '.btn-sm', function (ev) {
        dynamicButtonActivation(ev);
    })
});

function saveNewData() {
    entryNumber++;
    let newCar = readData(entryNumber);
    $("tbody").append(newCar.HTML);
    carData.push(newCar);
    newEntry = false; //reset newEntry variable

}

function saveEditedData() {
    carData[entryBeingEdited] = readData(entryBeingEdited);
    entryBeingEdited = -1; //reset global variable to a neutral state
    let tableBody = $("tbody");
    tableBody.html(""); //TODO this can be done via global variable without redrawing the table
    for (let i = 0; i < carData.length; i++) {
        tableBody.append(carData[i].HTML);
    }
}

/**reads input form and compiles an object with data and html
 *
 * @param  entryIdNumber (number)
 * @returns object {{distance: (*|jQuery|string|undefined), plateNo: (*|jQuery|string|undefined), time: (*|jQuery|string|undefined), entryId: number}}
 */
function readData(entryIdNumber) {
    let newCar = {
        entryId: entryNumber,
        plateNo: $("#plate_no").val(),
        distance: $("#distance").val(),
        time: $("#time").val(),
    };
    newCar.speed = Math.round(newCar.distance / newCar.time * 3.6); //calculate the speed
    newCar.HTML = '<tr id="' + entryIdNumber + '"' + //create id depending on the id number
        '><td>' + newCar.plateNo + //construct html for a table row with data and buttons
        '</td><td>' + newCar.distance +
        '</td><td>' + newCar.time +
        '</td><td>' + newCar.speed +
        '</td><td><button type="button" class="btn btn-secondary btn-sm ' + EDIT + '" data-toggle="modal" data-target="#entry_form">Edit</button></td>' +
        '<td><button type="button" class="btn btn-secondary btn-sm ' + DELETE + '">Delete</button></td></tr>';
    $("input").val(""); //remove entered values from inputs
    return newCar
}

function dynamicButtonActivation(ev) { //choose if delete or edit button was clicked
    let buttonClasses = ev.target.classList.toString();
    if (buttonClasses.indexOf(EDIT) + 1) {
        editEntry(ev);
    } else if (buttonClasses.indexOf(DELETE) + 1) {
        deleteEntry(ev);
    }
}

function editEntry(ev) {
    let carId = parseInt(ev.target.parentElement.parentElement.id);
    for (let i = 0; i < carData.length; i++) {
        if (carData[i].entryId === carId) {
            $("#plate_no").val(carData[i].plateNo);
            $("#distance").val(carData[i].distance);
            $("#time").val(carData[i].time);
            entryBeingEdited = i; //returns the relevant index of the main car array
            break
        }
    }
}

function deleteEntry(ev) {
    if (confirm("Are you sure?")) {
        let carId = parseInt(ev.target.parentElement.parentElement.id);
        carData.forEach(function (entry, index) {
            if (carId === entry.entryId) {
                carData.splice(index, 1); //delete relevant entry for the main data array
            }
        });
        ev.target.parentElement.parentElement.innerHTML = ""; //delete a row of the table
    }
}