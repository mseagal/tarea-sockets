const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

// settings
app.set('port', 3000);

// static files
app.use(express.static(path.join(__dirname,'public')));


const server = app.listen(app.get('port'), () => {
    console.log('Server on port ',app.get('port'));
});

// websockets
const io = SocketIO(server);

io.on('connection',(socket)=>{
    console.log('new connections ',socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message',data);
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing',data);
    })

    socket.on('client:message', (data) => {
        console.log(data);
    })
})