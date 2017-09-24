const socket = require('socket.io');

module.exports = function configureSocket(server) {
  const io = socket(server);

  const users = new Map();

  io.on('connection', function (socket) {

    socket.on('log in', function (name) {

      users.set(socket.id, name);

      socket.on('chat message', function (msg) {
        socket.broadcast.emit('chat message', `${users.get(socket.id)}: ${msg}`);
      });

      socket.on('disconnect', function () {
        users.delete(socket.id);
        const names = getNames(users);
        io.sockets.emit('user list update', names);
      });

      const names = getNames(users);
      io.sockets.emit('user list update', names);

    });

  });

  function getNames(map) {
    return Array.from(map.values());
  }
};
