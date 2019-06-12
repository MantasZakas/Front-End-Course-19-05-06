var PER_PAGE = 2;
var PAGE = 1;

console.log(window.location.href);
console.log(window.location.search); // ?_ijt=qcd4gdgnpru2sdu0p8gk68g8pk&page=2


alert('Puslapis persikrove');

function generateUrlParams() {
    var urlParams = window.location.search;
    var arr = urlParams.split('&'); // ["?_ijt=qcd4gdgnpru2sdu0p8gk68g8pk", "page=2"]
    var params = [];

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var arr2 = item.split('='); // ["page", "2"]
        var obj = {};
        obj[arr2[0]] = arr2[1]; // obj.page = "2"
        params.push(obj);
    }
    console.log(params);
    //[
    //  {?_ijt: "qcd4gdgnpru2sdu0p8gk68g8pk"}
    //  {page: "2"}
    // ]
    return params;
}

function getPage() {
    var params = generateUrlParams();

    var page = null;
    for (var i = 0; i < params.length; i++) {
        var item = params[i]; //{?_ijt: "qcd4gdgnpru2sdu0p8gk68g8pk"}
        if (!item.hasOwnProperty("page")) {
            continue;
        }
        page = parseInt(item.page); // 2
    }
    return page;
}
var jsn = new XMLHttpRequest();
var main = [];
jsn.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        main = JSON.parse(this.responseText);

        generateTable();
    }
};
jsn.open("GET", "data.json", true);
jsn.send();

function generateTable() {
    var itemsToIgnore = 0;
    if (PAGE > 1) {
        itemsToIgnore = PAGE * PER_PAGE - PER_PAGE;
    }
    var html = "";
    for (var i = itemsToIgnore; i < main.length; i++) {
        if (i < itemsToIgnore - 1) {
            continue;
        }
        if (i >= itemsToIgnore + PER_PAGE) {
            break;
        }
        var item = main[i];
        html += '<tr>' +
            '<td>' + item.userId + '</td>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.title + '</td>' +
            '<td>' + item.body + '</td>' +
            '</tr>';
    }
    document.getElementById("table1").innerHTML = html;
}