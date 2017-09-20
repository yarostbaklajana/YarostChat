const httpServer = require('http').Server;
const createApp = require('./webapp');
const configureSocket = require('./socket');

const app = createApp();
const server = httpServer(app);
configureSocket(server);

server.listen(3000, function () {
  console.log('Server is listening on port 3000');
});
