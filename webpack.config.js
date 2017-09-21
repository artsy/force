const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const {
  NODE_ENV,
  PORT
} = process.env

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: getEntrypoints(),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets',
    sourceMapFilename: '[name].js.map'
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        exclude: /node_modules/,
        loader: 'coffee-loader'
      },
      {
        test: /\.jade$/,
        exclude: /node_modules/,
        loader: 'jade-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`[Force] Listening on http://localhost:${PORT} \n`]
      },
      clearConsole: false
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new webpack.optimize.CommonsChunkPlugin('commons.chunk')
  ],
  resolve: {
    alias: {
      'jquery.ui.widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      'waypoints': 'waypoints/lib/jquery.waypoints.js'
    },
    extensions: ['.js', '.jsx', '.json', '.jade', '.coffee'],
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
  // config.entry.app.push('webpack-hot-middleware/client')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  // Staging
} else if (isDeploy) {
  config.devtool = '#source-map'

  // Prod
  if (isProduction) {
    // config.plugins.push(
    //   new webpack.optimize.UglifyJsPlugin({
    //     sourceMap: true
    //   })
    // )
  }
}

module.exports = config

// Helpers

function getEntrypoints () {
  return {
    ...findAssets('desktop/assets'),
    ...findAssets('mobile/assets')
  }
}

function findAssets (basePath) {
  const files = fs.readdirSync(path.join(process.cwd(), basePath))

  // Filter out .styl files
  const validAssets = (file) => {
    const whitelist = [
      '.js',
      '.coffee'
    ]

    const isValid = whitelist.some(extension => extension === path.extname(file))
    return isValid
  }

  /**
   * Construct key/value pairs representing Webpack compilation output; e.g.,
   * { desktop: [ path/to/desktop.js ] }
   */
  const assets = files
    .filter(validAssets)
    // .filter((f, i) => i < 2)
    .reduce((assetMap, file, index) => {
      const fileName = path.basename(file, path.extname(file))

      return {
        ...assetMap,
        [fileName]: [
          path.resolve(basePath, file)
        ]
      }
    }, {})

  return assets
}
