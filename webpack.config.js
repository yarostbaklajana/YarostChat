var path = require('path');

module.exports = {
  entry: "./public/javascripts/app.js",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  }
}