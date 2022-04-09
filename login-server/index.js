const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

// settings
app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
    console.log('Server on port ',app.get('port'));
});

// websockets
const io = SocketIO(server);
var users = [];

io.on('connection',(socket)=>{

    socket.on('commands', (data) => {
        command = data.split(' ');
        switch (command[0]) {
            case 'LOGIN':
                let user = users.findIndex(element => element.name == command[1]);
                if (user == -1) {
                    users.push({name : command[1], logins : 1});
                    socket.emit('login:resp', "Bienvenido usted es el usuario Nº: "+(users.findIndex(element => element.name ==  command[1])+1));

                }else{
                    let index = users.findIndex(element => element.name ==  command[1]);
                    users[index]['logins'] += 1;
                    socket.emit('login:resp', "ACCESO #"+users[index]['logins']);
                }
                break;
            
            case 'INFORME':
                let informe = users.map( function(user){
                    return user.name;
                });
                socket.emit('informe:resp', informe);

            default:
                console.log('No existe el comando '+command[0]);
                break;
        }
    })
})