var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/semantic",express.static(__dirname + "/semantic"));

var nameList = ["Zulhendri","Ryan Ade Hidayat", "Anoki Antoni", "Fajar Lazuardi"];
var billList = [115000, 250000, 165000, 300000, 450000, 225000];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/client', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
  socket.on('query info', function(msg){
    var dummy = {};
    dummy = {
      no: msg,
      name: nameList[Math.floor(Math.random() * nameList.length)],
      bill: billList[Math.floor(Math.random() * billList.length)]
    }
    socket.emit('query result', dummy);
  });

  socket.on('user confirm', function(userInfo){
    socket.broadcast.emit('user accept', userInfo);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
