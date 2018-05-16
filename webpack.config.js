const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { NODE_ENV, PORT, WEBPACK_DEVTOOL } = process.env
const isDevelopment = NODE_ENV === 'development'
const isStaging = NODE_ENV === 'staging'
const isProduction = NODE_ENV === 'production'
const isDeploy = isStaging || isProduction

const config = {
  devtool: WEBPACK_DEVTOOL || 'cheap-module-source-map',
  entry: {
    webpack: [
      'webpack-hot-middleware/client?reload=true',
      './src/desktop/apps/webpack/client.js',
    ],
    ...getEntrypoints(),
  },
  output: {
    filename: isDevelopment ? '[name].js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets',
    sourceMapFilename: '[file].map?[contenthash]',
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        include: /src/,
        use: [{ loader: 'coffee-loader' }],
      },
      {
        test: /\.(jade|pug)$/,
        include: /src/,
        loader: 'pug-loader',
        options: {
          doctype: 'html',
          root: __dirname,
        },
      },
      {
        test: /(\.(js|ts)x?$)/,
        include: /src/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    // TODO: Add webpack typechecker
    new ProgressBarPlugin(),
    new ForkTsCheckerWebpackPlugin({
      formatter: 'codeframe',
      formatterOptions: 'highlightCode',
      tslint: false,
      checkSyntacticErrors: true,
      watch: ['./src'],
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipFirstNotification: true,
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
      compilationSuccessInfo: {
        messages: [`[Force] Listening on http://localhost:${PORT} \n`],
      },
    }),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      jade: 'jade/runtime.js',
      waypoints: 'jquery-waypoints/waypoints.js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 10, // lower number for larger "common.js" bundle size
    }),
    new WebpackManifestPlugin({ publicPath: '/assets/' }),
  ],
  resolve: {
    alias: {
      'jquery.ui.widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      react: path.resolve('./node_modules/react'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.jade', '.coffee'],
    modules: ['node_modules', 'src'],
    symlinks: false,
  },
  externals: {
    request: 'request',
  },
}

if (isDevelopment) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  // Staging
} else if (isDeploy) {
  config.devtool = '#source-map'

  // Prod
  if (isProduction) {
    config.plugins.push(
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
      })
    )
  }
}

// Helpers

function getEntrypoints() {
  return {
    ...findAssets('src/desktop/assets'),
    ...findAssets('src/mobile/assets'),
  }
}

function findAssets(basePath) {
  const files = fs.readdirSync(path.join(process.cwd(), basePath))

  // Filter out .styl files
  const validAssets = file => {
    const whitelist = ['.js', '.coffee']

    const isValid = whitelist.some(
      extension => extension === path.extname(file)
    )
    return isValid
  }

  /**
   * Construct key/value pairs representing Webpack entrypoints; e.g.,
   * { desktop: [ path/to/desktop.js ] }
   */
  const assets = files.filter(validAssets).reduce((assetMap, file) => {
    const fileName = path.basename(file, path.extname(file))
    const asset = {
      [fileName]: [path.join(__dirname, basePath, file)],
    }

    // Load oldschool global module dependencies
    asset[fileName].unshift('./src/lib/global_modules')

    if (isDevelopment) {
      asset[fileName].unshift('webpack-hot-middleware/client?reload=true')
    }

    return {
      ...assetMap,
      ...asset,
    }
  }, {})

  return assets
}

module.exports = config
