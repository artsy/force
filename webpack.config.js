const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const fs = require("fs")
const path = require("path")
const webpack = require("webpack")

const { CI, NODE_ENV, PORT, WEBPACK_DEVTOOL, ANALYZE_BUNDLE } = process.env
const isDevelopment = NODE_ENV === "development"
const isStaging = NODE_ENV === "staging"
const isProduction = NODE_ENV === "production"
const isDeploy = isStaging || isProduction
const isCI = CI === "true"

const cacheDirectory = path.resolve(__dirname, ".cache")

if (!isCI && !fs.existsSync(cacheDirectory)) {
  console.log(
    require("chalk").yellow(
      "\n[!] No existing `.cache` directory detected, initial " +
        "launch will take a while.\n"
    )
  )
}

const config = {
  mode: NODE_ENV,
  devtool: WEBPACK_DEVTOOL || "cheap-module-source-map",
  stats: "errors-only",
  entry: {
    webpack: [
      "webpack-hot-middleware/client?reload=true",
      "./src/desktop/apps/webpack/client.js",
    ],
    ...getEntrypoints(),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/assets"),
    publicPath: "/assets",
    sourceMapFilename: "[file].map?[contenthash]",
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        include: /src/,
        use: [{ loader: "coffee-loader" }],
      },
      {
        test: /\.(jade|pug)$/,
        include: /src/,
        use: [
          {
            loader: "pug-loader",
            options: {
              doctype: "html",
              root: __dirname,
            },
          },
        ],
      },
      {
        test: /(\.(js|ts)x?$)/,
        include: path.resolve("./src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: isCI ? false : path.join(cacheDirectory, "babel"),
            },
          },
        ],
      },
      // ESM support. See: https://github.com/apollographql/react-apollo/issues/1737#issuecomment-371178602
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        use: [],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false,
          },
          safari10: true,
        },
      }),
    ],
    runtimeChunk: {
      name: "common",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "common",
          chunks: "initial",
          minChunks: 10,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  plugins: [
    ...notOnCI(new SimpleProgressWebpackPlugin({ format: "compact" })),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Remove moment.js localization files
    new ForkTsCheckerWebpackPlugin({
      formatter: "codeframe",
      formatterOptions: "highlightCode",
      tslint: false,
      checkSyntacticErrors: true,
      watch: ["./src"],
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
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      jade: "jade/runtime.js",
      waypoints: "jquery-waypoints/waypoints.js",
    }),
  ],
  resolve: {
    alias: {
      "jquery.ui.widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",
      react: require.resolve("react"),
      "styled-components": require.resolve("styled-components"),
    },
    extensions: [
      ".mjs",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      ".jade",
      ".coffee",
    ],
    // TODO: The problem with including /all/ node_modules directories is that
    //       when using npm-link it can bring in dev dependencies that we
    //       don’t need or worse are duplicates and lead to bugs. However,
    //       ignoring all non-hoisted modules now would probably lead to bugs
    //       as well.
    // path.resolve(__dirname, "node_modules"),
    // path.resolve(__dirname, "node_modules/@artsy/reaction/node_modules"),
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    symlinks: false,
  },
  externals: {
    request: "request",
  },
}

if (isDevelopment) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  // Staging / Prod
} else if (isDeploy) {
  config.devtool = "source-map"

  if (ANALYZE_BUNDLE) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }
}

// Helpers

function notOnCI(value) {
  return isCI ? [] : [value]
}

function getEntrypoints() {
  return {
    ...findAssets("src/desktop/assets"),
    ...findAssets("src/mobile/assets"),
  }
}

function findAssets(basePath) {
  const files = fs.readdirSync(path.join(process.cwd(), basePath))

  // Filter out .styl files
  const validAssets = file => {
    const whitelist = [".js", ".coffee"]

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
    asset[fileName].unshift("./src/lib/global_modules")

    if (isDevelopment) {
      asset[fileName].unshift("webpack-hot-middleware/client?reload=true")
    }

    return {
      ...assetMap,
      ...asset,
    }
  }, {})

  return assets
}

module.exports = config
