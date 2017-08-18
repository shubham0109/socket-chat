var express = require('express'); // loads up the express module
var app = express(); // calling the express method
var http = require('http').Server(app); // create a server and then pass express(app) to it as a handler
var io = require('socket.io')(http); // initializing a new instance of socket.io by passing the http server object,in other words http server passed to socket.io

app.get('/', function(req,res){					
	res.sendFile(__dirname + '/index.html');	// serving the html file when we hit home page(/)
})

io.on('connection', function(socket){  // listening on connection for any incoming sockets
	socket.on('chat message', function(msg){ // get the chat message
		socket.broadcast.emit('chat message',msg);  // broadcast it to every user connected except the sender 
	});
	//console.log('user is connected');
});

http.listen(3000, function(){
	console.log("SERVER IS RUNNING"); // listening for server on localhost:3000
});

