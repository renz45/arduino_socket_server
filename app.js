var express = require("express");
var app = express(),
    http = require('http'),
    server = http.createServer(app)

var io = require('socket.io').listen(server)
io.configure(function() {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

var socket;
io.sockets.on('connection', function (connectedSocket) {
  socket = connectedSocket
  socket.emit('led_state', { led: 'on'});
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

app.get('/port', function (req, res) {
  res.send(process.env.PORT);
});

// Launch server
if(process.env.PORT) {
  app.listen(process.env.PORT);
}else{
  app.listen(4242);
}