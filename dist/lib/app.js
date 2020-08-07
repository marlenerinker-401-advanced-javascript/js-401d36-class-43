"use strict";
exports.__esModule = true;
var express = require("express");
var socketio = require("socket.io");
var http = require("http");
var app = express();
var server = http.createServer(app);
var io = socketio(server);
app.use(express.static('./public'));
var messages = [];
app.get('/info', function (req, res, next) {
    console.log(req.query);
    res.send('hitting our slash route');
});
app.get('/about', function (req, res, next) {
    console.log(req.query);
    res.send('hitting the about route');
});
io.on('connection', function (socket) {
    console.log('socket connected');
    socket.on('message', function (message) {
        messages.push(message);
        console.log(messages);
        io.emit('message', messages);
    });
    socket.on('disconnect', function () {
        console.log('I just disconnected');
    });
});
exports["default"] = {
    start: function (port) {
        server.listen(port, function () {
            console.log('App running');
        });
    }
};
//# sourceMappingURL=app.js.map