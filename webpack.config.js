const webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './desktop/webpack/index.js'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/public/assets'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  }
}
