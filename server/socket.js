const socket = require('socket.io');

module.exports = function configureSocket(server) {
  const io = socket(server);

  io.on('connection', function(socket){

    socket.on('user logged', function (name) {
      socket.username = name;
      const names = getNames(io.sockets.sockets);
      io.sockets.emit('user update', names);
    });

    socket.on('chat message', function(msg){
      socket.broadcast.emit('chat message', `${socket.username}: ${msg}`);
    });

    socket.on('disconnect', function () {
      const names = getNames(io.sockets.sockets);
      io.sockets.emit('user update', names);
    });
  });

  function getNames (arr) {
    return Object.keys(arr).map( (key)  => {
      return arr[key].username;
    });
  }
};