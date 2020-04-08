﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;


connection.on("ReceiveMessage", function (user, message) {
    var option = document.createElement("option");
    option.textContent = message;
    document.getElementById("selectOption").appendChild(option);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("addGroup").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("groupInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});