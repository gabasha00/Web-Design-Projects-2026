const express = require('express');
const nunjucks = require('nunjucks');

//New for us to incorporate socket
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

// New initializations
const httpServer = createServer(app);
const io = new Server(httpServer); //links websocket server to express server

// Reg configs
app.use(express.static('public'));
app.set('view engine', 'njk');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//reg route
app.get('/', (request, response) => {
    response.render('index.njk', {numClient: io.engine.clientsCount})
});

//New handler for determining if a client has connected
//any websocket events will go into this connection handler
io.on('connection', (socket) => {
	console.log('a user connected');
    console.log('total users ' + io.engine.clientsCount);
    

    socket.on('lalala', (dataFromClient) => {
        console.log('message: ' + dataFromClient);

        io.emit('server sent data', dataFromClient)
    });
        
       //Exampple of handling a specific event fired from client
       // conect / disconnect are reserved words and cannot be used
    	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

//replaces app.listen and instead uses this server
httpServer.listen(3000,  ()=> {
    console.log('server loaded')
})