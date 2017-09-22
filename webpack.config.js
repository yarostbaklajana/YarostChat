var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new ExtractTextPlugin('styles.css')
  ]
}