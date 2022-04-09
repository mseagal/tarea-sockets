
const io = require('socket.io-client');

console.log("Client started");

var socket = io.connect('http://127.0.0.1:3000');
var conn = socket.on('connect', function () {
    console.log("Escriba un mensaje: ");
    var stdin = process.openStdin();
    stdin.addListener("data", function(d) {
      socket.emit('commands', d.toString().trim());
      });

      socket.on('login:resp', function (data) {
            console.log(data);
      })

      socket.on('informe:resp', function (data) {
            console.log(data);
      })


});