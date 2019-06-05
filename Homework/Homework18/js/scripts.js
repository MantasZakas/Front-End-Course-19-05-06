const LINKS = { //links and table presets sorted by id
    posts:["https://jsonplaceholder.typicode.com/posts",
        '<th>User ID</th><th>Title</th><th>Post</th>'],
    comments:["https://jsonplaceholder.typicode.com/comments",
        '<th>Comment ID</th><th>Name</th><th>Email</th><th>Comment</th>'],
    albums:["https://jsonplaceholder.typicode.com/albums",
        '<th>User ID</th><th>Title</th>'],
    photos:["https://jsonplaceholder.typicode.com/photos",
        '<th>Album ID</th><th>Title</th><th>url</th><th>Thumbnail</th>'],
    todos:["https://jsonplaceholder.typicode.com/todos",
        '<th>User ID</th><th>Title</th><th>Is it completed?</th>'],
    users:["https://jsonplaceholder.typicode.com/users",
        '<th>Name</th><th>User Name</th><th>Email</th>']
};
// var newData = "";

function prepButtons() {  //called onLoad for body
    for (let id in LINKS) {
        document.getElementById(id).addEventListener("click",function(){
            getData(LINKS[id][0], id);
        })
    }
}

function getData (uri, id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // document.getElementById("demo").innerHTML = this.responseText;
            let newData = this.responseText;
            newData = JSON.parse(newData);
            displayData(id, newData);
        }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
}

function displayData (id, newData) {
    console.log(id);
    document.getElementById("dataTable").firstElementChild.innerHTML = LINKS[id][1];
    let tableBody = "";
    if (id === "users") {
        newData.forEach(function (entry) {
            tableBody += '<tr>';
            console.log(entry);
            for (let key in entry) {
                if (key === "id") continue;
                if (key === "address") break;
                tableBody += '<td>' + entry[key] + '</td>';
            }
            tableBody += '</tr>';
        })
    } else {
        newData.forEach(function (entry) {
            tableBody += '<tr>';
            for (let key in entry) {
                if (key === "completed") { //process true/false on completed
                    if (entry[key]) {
                        tableBody += '<td>Done</td>'
                    } else {
                        tableBody += '<td>Not yet</td>'
                    }
                    continue;
                }
                if (key === "thumbnailUrl") { //display thumbnails
                    tableBody += '<td><img src="' + entry[key] + '"></td>'
                    continue;
                }
                if (key !== "id") tableBody += '<td>' + entry[key] + '</td>';
            }
            tableBody += '</tr>';
        });
    }
    document.getElementById("dataTable").lastElementChild.innerHTML = tableBody;
}