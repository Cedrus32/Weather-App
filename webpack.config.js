// eslint-disable-next-line no-undef
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'matches HTML doc title',
    // }),
  ],
  output: {
    filename: '[name].main.js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    // clean: true,
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'icons/[name][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader'],
        },
        {
          test: /\.xml$/i,
          use: ['xml-loader'],
        },
    ],
  },
};