const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: '[chunkhash].[name].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, './src'),
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /.local\.(css|scss)$/,
      include: path.resolve(__dirname, './src'),
      use: ['style-loader', {loader: 'css-loader', options: {modules: true}}]
    },
    {
      test: /.global\.(css|scss)$/,
      exclude: /\.module\.(css|scss)$/,
      include: path.resolve(__dirname, './src'),
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|jpe?g|gif|mp4)$/,
      include: path.resolve(__dirname, './src'),
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    }],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './docs'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}