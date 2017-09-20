const socket = require('socket.io');

module.exports = function configureSocket(server) {
  const io = socket(server);

  io.on('connect', function(socket){
    socket.on('chat message', function(msg){
      socket.emit('chat message', `Echo: ${msg}`);
    });
  });
};