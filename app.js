var express = require("express");
var app = express();

var io = require('socket.io-client');
var socket = io.connect('http://localhost:9292');

socket.on('connect_failed', function(){
    console.log('Connection Failed');
});
socket.on('connect', function(){
    console.log('Connected');
});
socket.on('disconnect', function () {
  console.log('Disconnected');
});

app.get('/command', function (req, res) {
  socket.emit('command', {pin: req.query['pin'], state: req.query['state']})
  res.end();
});

app.get('/all_on', function (req, res) {
  socket.emit('all_on', true)
  res.end();
});

app.get('/all_off', function (req, res) {
  socket.emit('all_on', false)
  res.end();
});

// Launch server

app.listen(4242);