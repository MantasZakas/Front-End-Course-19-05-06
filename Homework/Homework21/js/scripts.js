let map = {}; //global variable for google maps
let marker = {}; //global variable for google maps marker

$(document).ready(function () {
    $("#submit").click(function (ev) {
        ev.preventDefault();
        getPostCode();
        getCoordinates();
    });
    getCoordinatesFromIp(); //focus map on irl ip location
});

function getPostCode() {
    let requestUri = processForm(postCodeUri);
    ajaxGet(requestUri, displayPostCode);
}

function getCoordinates() {
    let requestUri = processForm(coordinatesUri);
    ajaxGet(requestUri, displayCoordinatesFromForm);
}

/**create url for ajax with data from the input form
 *
 * @returns {string}
 */
function processForm(callBack) {
    let city = $("#city").val();
    let street = $("#street").val();
    let number = $("#number").val();
    if (!city || !street || !number) {
        alert("Ne visi laukeliai užpildyti");
        return ""
    }
    let requestUri = callBack(city, street, number);
    return encodeURI(requestUri);
}

/** generate request uri for postit.lt
 *
 * @param city {string}
 * @param street {string}
 * @param number {string}
 * @returns {string}
 */
function postCodeUri(city, street, number) {
    return "https://api.postit.lt/v2/?city=" + city +
        "&street=" + street +
        "&number=" + number +
        "&key=EYdOeK3SBC3EpQ8MjGNI";
}

/** generate request uri for locationiq.com
 *
 * @param city {string}
 * @param street {string}
 * @param number {string}
 * @returns {string}
 */
function coordinatesUri(city, street, number) {
    return "https://eu1.locationiq.com/v1/search.php?key=b2f47dfd0b67f5&city=" + city +
        "&street=" + street + " " + number +
        "&format=json"
}

/**
 *
 * @param requestUri (string)
 * @param callBack (function)
 */
function ajaxGet(requestUri, callBack) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callBack(JSON.parse(this.responseText))
        }
    };
    xhttp.open("GET", requestUri, true);
    xhttp.send();
}

function getCoordinatesFromIp() {
    let requestUri = 'https://api.ipgeolocation.io/ipgeo?apiKey=3ac638f8208b47e0bbefea86ae8bc892';
    ajaxGet(requestUri, displayCoordinatesFromIp);
}

/**
 *
 * @param response (object) generated with ajax
 */
function displayCoordinatesFromIp(response) {
    let latitude = parseFloat(response.latitude);
    let longitude = parseFloat(response.longitude);
    map.setCenter({lat: latitude, lng: longitude});
    dropMarker(latitude, longitude);
}

/**decode json and display post code
 *
 * @param response (object)
 */
function displayPostCode(response) {
    let postCode = "nerastas";
    if (response.data.length) { //if postcode is not found response.data is empty
        postCode = response.data[0].post_code; //retrieve post code from the object
    }
    $("#post_code").html(postCode);
}

/**
 *
 * @param response (array)
 */
function displayCoordinatesFromForm(response) {
    let latitude = parseFloat(response[0].boundingbox[0]);
    let longitude = parseFloat(response[0].boundingbox[2]);
    map.setCenter({lat: latitude, lng: longitude});
    dropMarker(latitude, longitude);
    map.setZoom(15);
}

/**
 *
 * @param latitude (float)
 * @param longitude (float)
 */
function dropMarker(latitude, longitude) {
    marker = new google.maps.Marker({
        position: ({lat: latitude, lng: longitude}),
        map: map,
    });
}

function myMap() {  //needed for google map
    let myLatLng = {lat: 0, lng: 0};
    let mapProp = {
        center: new google.maps.LatLng(myLatLng),
        zoom: 10,
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}