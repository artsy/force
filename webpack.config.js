const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const path = require('path')
const webpack = require('webpack')

const {
  NODE_ENV,
  PORT
} = process.env

const config = {
  devtool: 'eval',
  entry: {
    app: [
      './desktop/webpack/index.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/public/assets',
    sourceMapFilename: '[name].js.map'
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
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`[Force] Listening on http://localhost:${PORT} \n`]
      }
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('commons.chunk')
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  }
}

const isDevelopment = NODE_ENV === 'development'
const isStaging = NODE_ENV === 'staging'
const isProduction = NODE_ENV === 'production'
const isDeploy = isStaging || isProduction

if (isDevelopment) {
  config.entry.app.push('webpack-hot-middleware/client')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  // Staging
} else if (isDeploy) {
  config.devtool = '#source-map'

  // Prod
  if (isProduction) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
    )
  }
}

module.exports = config
