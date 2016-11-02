/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var cssnano = require('cssnano');

var cssModulesLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

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
    extensions: ['', '.js', '.jsx', '.scss']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.scss?$/,
        loaders: [
          'style',
          cssModulesLoader,
          'postcss',
          'sass?sourceMap'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  
  sassLoader: {
    data: '@import "' + [path.resolve(SRC_PATH, 'shared/_globals.scss')] + '";'
  },
  
  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ],
  resolve: {
    alias: {
      'components': path.resolve(SRC_PATH, 'components')
    }
  }
};
