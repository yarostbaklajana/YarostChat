const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[ext]'
            }
          }
        ],
        include: [path.join(__dirname, 'client/images/emoji/')]
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
        ],
        exclude: [path.join(__dirname, 'client/images/emoji/')]
      },
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new ExtractTextPlugin('styles.css')
  ]
}