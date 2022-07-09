// import express from "express"
// import http from "http"
// import socketio from "socket.io"

// let app = express();
// let httpServer = http.Server(app);
// let io = socketio(http);

// app.get('/', (req, res) => {
//     res.render('index.html');
// });
// let members = 0
// // 클라이언트에서 connect에 성공 시 호출됩니다.
// io.on('connection', (socket) => {
// 	members++
// 	socket.userid = members
// 	console.log('client connected');
	
// 	socket.on('message', (message) => {
// 		socket.broadcast.emit('message', message)
// 		console.log(message);
// 	});
	
// 	socket.on('disconnect', () => {
// 		console.log(`${socket.userid} disconnected`);
// 		members--
// 	});
// });

// httpServer.listen(3000, () => {
// 	console.log('listening port: 3000');
// });

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.render('index');
});
let members = 0;
// 클라이언트에서 connect에 성공 시 호출됩니다.
io.on('connection', (socket) => {
	members++
	socket.userid = members
	console.log(`${members} connected`);
	socket.emit("color", socket.userid == 1 ? "white" : "black")
	socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
		console.log(message);
	});
	
	socket.on('disconnect', () => {
    	// 클라이언트의 연결이 끊어졌을 때 호출됩니다.
		console.log(`${socket.userid} disconnected`);
		members--
	});
});

// 소켓 통신을위해 포트를 지정합니다. 
var PORT = 3000;
http.listen(PORT, () => {
	console.log('listening port: 3000');
});

// 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
// socket.broadcast.emit('chat', msg);

// 메시지를 전송한 클라이언트에게만 메시지를 전송한다
// socket.emit('s2c chat', msg);

// 접속된 모든 클라이언트에게 메시지를 전송한다
// io.emit('s2c chat', msg);

// 특정 클라이언트에게만 메시지를 전송한다
// io.to(id).emit('s2c chat', data);