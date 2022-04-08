
const io = require('socket.io-client');

console.log("Cliente iniciado!");

var socket = io.connect('http://127.0.0.1:3000');
socket.on('connect', function () {
    console.log("Escriba un mensaje: ");
    var stdin = process.openStdin();
    stdin.addListener("data", function(d) {
            socket.emit('client:message', d.toString().trim());
      });
});