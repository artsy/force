const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { NODE_ENV, PORT } = process.env
const isDevelopment = NODE_ENV === 'development'
const isStaging = NODE_ENV === 'staging'
const isProduction = NODE_ENV === 'production'
const isDeploy = isStaging || isProduction

const config = {
  // devtool: 'eval',
  devtool: 'source-map',
  // devtool: 'cheap-module-source-map', // https://github.com/facebookincubator/create-react-app/issues/2407
  entry: {
    webpack: [
      'webpack-hot-middleware/client?reload=true',
      './desktop/apps/webpack/client.js'
    ],
    ...getEntrypoints()
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets',
    sourceMapFilename: '[file].map?[contenthash]'
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              env: {
                development: {
                  presets: ['react-hmre'],
                  plugins: [
                    ['react-transform', {
                      transforms: [{
                        transform: 'react-transform-hmr',
                        imports: ['react'],
                        locals: ['module']
                      }]
                    }]
                  ]
                }
              }
            }
          }
        ]
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
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 10 // lower number for larger "common.js" bundle size
    })
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
  },
  externals: {
    request: 'request'
  }
}

if (isDevelopment) {
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
   * Construct key/value pairs representing Webpack entrypoints; e.g.,
   * { desktop: [ path/to/desktop.js ] }
   */
  const assets = files
    .filter(validAssets)
    .reduce((assetMap, file) => {
      const fileName = path.basename(file, path.extname(file))
      const asset = {
        [fileName]: [
          path.join(__dirname, basePath, file)
        ]
      }

      if (isDevelopment) {
        asset[fileName].unshift(
          'webpack-hot-middleware/client?reload=true'
        )
      }

      return {
        ...assetMap,
        ...asset
      }
    }, {})

  return assets
}

module.exports = config
