/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var Copy = require('copy-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
var MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new Copy([
      { from: 'src/index.html', to: 'dist/index.html' }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    alias: {
      'components': path.resolve(SRC_PATH, 'components'),
      'react': path.resolve(MODULE_PATH, 'react', 'react'),
      'react-dom': path.resolve(MODULE_PATH, 'react', 'lib', 'ReactDOM'),
      'react-router': path.resolve(MODULE_PATH, 'react-router', 'lib')
    }
  }
};
