# Arduino socket server
This is the server side app for my node.js arduino api. Check out the client code at: (arduino_socket_client)[https://github.com/renz45/arduino_socket_client]

This is really just a simple wep api which emits events through socket.io to any connected clients built on top of express for easy routes.

You could also easily modify this into a web interface instead of just an api, which is awesome, since ewith sockets you can get information both ways. So you could do something like see the temprature of your house, or see if you left any lights on, as long as your sending the information back from the client app.