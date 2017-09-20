const express = require('express');
const path = require('path');

module.exports = function createApp() {
  const app = express();
  app.use(express.static(path.join(__dirname, '../public')));
  return app;
};