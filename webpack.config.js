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
      test: /\.(mp4)$/,
      include: path.resolve(__dirname, './src'),
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    },
    {
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '/images/[hash]-[name].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    }]
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