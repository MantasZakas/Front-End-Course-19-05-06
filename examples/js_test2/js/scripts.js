// /**
//  Turime masyvą, kurio kiekvienas elementas yra masyvas iš keturių elementų:
//  a) data kaip tekstinė eilutė, pvz: '2017-07-06 19:59:45'
//  b) automobilio numeris, pvz.: 'LRS123'
//  c) automobilio nuvažiuotas kelias metrais
//  d) automobilio sugaištas laikas sekundėmis
//
//  Išveskite visus automobilius į html lentelę kartu su suskaičiuotu automobilio greičiu
//  kilometrais per valandą.
//  **/
// var arr = [
//     ["2017-07-01 14:59:45", "LRS123", "2000", "120"],
//     ["2017-07-02 15:59:45", "LRS123", "1000", "120"],
//     ["2017-07-03 16:59:45", "LRS123", "15000", "1200"],
//     ["2017-07-04 17:59:45", "LRS150", "1020", "135"],
// ];
//
// var html = "";
// for (var i = 0; i < arr.length; i++) {
//     var item = arr[i];
//     var distance = parseInt(item[2]);
//     var time = parseInt(item[3]);
//     html += '<tr>' +
//         '<td>' + item[0] + '</td>' + // DateTime
//         '<td>' + item[1] + '</td>' + // Plate nr
//         '<td>' + metersToKilometers(distance) + '</td>' + // Distance
//         '<td>' + secondsToMinutes(time) + '</td>' + // Time
//         '<td>' + calcKilometersPerHour(distance, time).toFixed(2) + '</td>' + // Speed
//         '</tr>';
// }
//
// document.getElementById("cars-table-content").innerHTML = html;
//
// /**
//  * @param {number} distanceInMeters
//  * @returns {number}
//  */
// function metersToKilometers(distanceInMeters) {
//     return distanceInMeters / 1000;
// }
//
// /**
//  * @param {number} timeInSeconds
//  * @returns {number}
//  */
// function secondsToMinutes(timeInSeconds) {
//     return timeInSeconds / 60;
// }
//
// /**
//  * @param {number} distanceInMeters
//  * @param {number} timeInSec
//  * @returns {number}
//  */
// function calcKilometersPerHour(distanceInMeters, timeInSec) {
//     return metersToKilometers(distanceInMeters) / (secondsToMinutes(timeInSec) / 60);
// }
/**
 Turime masyvą, kurio kiekvienas elementas yra masyvas iš keturių elementų:
 a) data kaip tekstinė eilutė, pvz: '2017-07-06 19:59:45'
 b) automobilio numeris, pvz.: 'LRS123'
 c) automobilio nuvažiuotas kelias metrais
 d) automobilio sugaištas laikas sekundėmis

 Išveskite visus automobilius į html lentelę kartu su suskaičiuotu automobilio greičiu
 kilometrais per valandą.
 **/

var carArr = [];

document.getElementById('car-form').addEventListener("submit", function(e) {
    e.preventDefault();
    var dateTime = document.getElementById('date_time').value;
    var plateNr = document.getElementById('plate_nr').value;
    var distanceInMeters = parseInt(document.getElementById('distance_in_meters').value);
    var timeInSec = parseInt(document.getElementById('time_in_sec').value);

    // Validation
    if (dateTime.length <= 0) {
        alert('Empty dateTime');
        return false;
    }
    if (plateNr.length <= 0) {
        alert('Empty plateNr');
        return false;
    }
    if (distanceInMeters) {
        alert('Empty distanceInMeters');
        return false;
    }
    if (distanceInMeters < 0) {
        alert('Please enter distanceInMeters >= 0');
        return false;
    }
    if (timeInSec) {
        alert('Empty timeInSec');
        return false;
    }

    if (timeInSec < 10) {
        alert('TimeInSec to small');
        return false;
    }
    addCar(dateTime, plateNr, distanceInMeters, timeInSec);
    generateTable();
    return false;
});

function addCar(dateTime, plateNr, distanceInMeters, timeInSec) {
    carArr.push([dateTime, plateNr, distanceInMeters, timeInSec]);
}

function generateTable() {
    var html = "";
    for (var i = 0; i < carArr.length; i++) {
        var item = carArr[i];
        var distance = parseInt(item[2]);
        var time = parseInt(item[3]);
        html += '<tr>' +
            '<td>' + item[0] + '</td>' + // DateTime
            '<td>' + item[1] + '</td>' + // Plate nr
            '<td>' + metersToKilometers(distance) + '</td>' + // Distance
            '<td>' + secondsToMinutes(time) + '</td>' + // Time
            '<td>' + calcKilometersPerHour(distance, time).toFixed(2) + '</td>' + // Speed
            '</tr>';
    }
    document.getElementById("cars-table-content").innerHTML = html;
}

/**
 * @param {number} distanceInMeters
 * @returns {number}
 */
function metersToKilometers(distanceInMeters) {
    return distanceInMeters / 1000;
}

/**
 * @param {number} timeInSeconds
 * @returns {number}
 */
function secondsToMinutes(timeInSeconds) {
    return timeInSeconds / 60;
}

/**
 * @param {number} distanceInMeters
 * @param {number} timeInSec
 * @returns {number}
 */
function calcKilometersPerHour(distanceInMeters, timeInSec) {
    return metersToKilometers(distanceInMeters) / (secondsToMinutes(timeInSec) / 60);
}