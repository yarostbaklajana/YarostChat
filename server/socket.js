const socket = require('socket.io');

module.exports = function configureSocket(server) {
  const io = socket(server);

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', `Echo: ${msg}`);
    });
  });
};