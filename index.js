var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var query = require('./query')

// Register static files here
app.use("/semantic",express.static(__dirname + "/semantic"));
app.use("/images",express.static(__dirname + "/images"));

app.use("/semantic",express.static(__dirname + "/semantic"));
app.use('/query', query)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/client', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
  socket.on('query info', function(msg){
    var dummy = {};
    socket.emit('query result', dummy);
  });

  socket.on('user confirm', function(userInfo){
    socket.broadcast.emit('user accept', userInfo);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
