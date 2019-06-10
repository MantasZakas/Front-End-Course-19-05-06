$(document).ready(function () {
    $("#submit").click(function (ev) {
        ev.preventDefault();
        getPostCode();
    });
});

function getPostCode() {
    let requestUri = processForm();
    ajaxPostCode(requestUri);
}

/**create url for ajax with data from the input form
 *
 * @returns {string}
 */
function processForm() {
    let city = $("#city").val();
    let street = $("#street").val();
    let number = $("#number").val();
    if (!city || !street || !number) {
        alert("Ne visi laukeliai užpildyti");
        return ""
    }
    let requestUri = "https://api.postit.lt/v2/?city=" + city +
        "&street=" + street +
        "&number=" + number +
        "&key=EYdOeK3SBC3EpQ8MjGNI";
    return encodeURI(requestUri);
}

function ajaxPostCode(requestUri) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayPostCode(this.responseText)
        }
    };
    xhttp.open("GET", requestUri, true);
    xhttp.send();
}

/**decode json and display post code
 *
 * @param response (string)
 */
function displayPostCode(response) {
    response = JSON.parse(response);
    let postCode = "nerastas";
    if (response.data.length) { //if postcode is not found response.data is empty
        postCode = response.data[0].post_code; //retrieve post code from the object
    }
    $("#post_code").html(postCode);
}

