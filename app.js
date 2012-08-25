var express = require("express");
var app = express();

var io = require('socket.io')
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
io.listen(app);

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

app.get('/all_off', function (req, res) {
  socket.emit('all_on', false)
  res.end();
});

// Launch server
if(process.env.PORT) {
  app.listen(process.env.PORT);
}else{
  app.listen(4242);
}