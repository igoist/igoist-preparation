const path = require('path');
// const webpack = require('webpack');
// const publicPath = './public/';

module.exports = [
  {
    entry: {
      index: path.resolve(__dirname, 'index.js'),
    },

    output: {
      filename: '[name].bundle.min.js',
      // 好好考虑一下
      path: path.resolve(__dirname, 'dist/js'),
      // publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ['babel-loader', 'eslint-loader'],
          // include: [path.join(__dirname, publicPath + 'js')]
        },
      ]
    },

    // 不着急
    // plugins: [
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    //   })
    // ]
  },
];
