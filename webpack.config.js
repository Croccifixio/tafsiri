
const path = require('path')

module.exports = {
  entry: {
    main: path.resolve('./src/cli.js'),
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  target: 'node',
  mode: 'production',
  stats: 'errors-only',
  bail: true,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
