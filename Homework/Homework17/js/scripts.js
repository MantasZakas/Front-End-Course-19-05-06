"use strict";

function prepare() {
    document.getElementById("validate").addEventListener("click", customValidation)
}

function customValidation(e) {
    e.preventDefault();
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;
    let valid = false;
    try {
        if (!password1) throw "Enter a password";
        if (!password2) throw "Repeat the password";
        if (password1 !== password2) throw "Passwords don't match";
        valid = true;
    } catch (error) {
        document.getElementById("messageBox").innerHTML = error;
    }
    if (valid) {
        document.getElementById("messageBox").innerHTML = ("Processing " + '<i class="fas fa-compact-disc fa-spin"></i>');
        document.getElementById('validate').disabled = true;
        document.getElementById('password1').disabled = true;
        document.getElementById('password2').disabled = true;
    }
}
