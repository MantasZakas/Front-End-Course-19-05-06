var carData = [];

$(document).ready(function(){
    $("#save").click(function(){
        console.log("save");
        getData();
    });
});

function getData () {
    let newCar = {
        plateNo: $("#plate_no").val(),
        distance: $("#distance").val(),
        time: $("#time").val(),
    };
    newCar.speed = newCar.distance / newCar.time * 3.6;
    newCar.HTML = '<tr><td>' + newCar.plateNo +
        '</td><td>' + newCar.distance +
        '</td><td>' + newCar.time +
        '</td><td>' + newCar.speed + '</td></tr>';
    $("input").val(""); //remove entered values from inputs
    console.log(newCar.HTML);
    $("tbody").html(newCar.HTML);
    console.log(newCar);
    carData.push(newCar);
    console.log(carData);
}