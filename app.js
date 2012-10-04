var express = require("express");
var app = express(),
    http = require('http'),
    server = http.createServer(app)

// Launch server
if(process.env.PORT) {
  server.listen(process.env.PORT);
}else{
  server.listen(9292);
}

var io = require('socket.io').listen(server)

var socket;
io.sockets.on('connection', function (connectedSocket) {
  console.log('SOCKET CONNECTED')
  socket = connectedSocket
  socket.emit('led_state', { led: 'on'});
});

app.get('/command', function (req, res) {
  socket.emit('command', {pin: req.query['pin'], state: req.query['state']})
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify({response: 'true'}));
});

app.get('/toggle_all', function (req, res) {
  socket.emit('toggle_all', true)
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify({response: 'true'}));
});

app.get('/all_off', function (req, res) {
  socket.emit('all_on', false)
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify({response: 'true'}));
});

app.get('/port', function (req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify({port: process.env.PORT}));
});