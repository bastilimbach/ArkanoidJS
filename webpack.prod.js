/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([{
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        },
        { loader: 'sass-loader' },
        ]),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'index.html',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('bundle.css'),
    new UglifyJSPlugin(),
  ],
}
