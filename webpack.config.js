const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin")
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
      "\n[!] Bugger. No existing `.cache` directory detected, this initial " +
        "launch will take a while. Perhaps make yourself a nice cuppa tea " +
        "first, champ?\n"
    )
  )
}

const config = {
  devtool: WEBPACK_DEVTOOL || "cheap-module-source-map",
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
        use: [
          ...notOnCI({
            loader: "cache-loader",
            options: {
              cacheDirectory: path.join(cacheDirectory, "coffee"),
            },
          }),
          { loader: "coffee-loader" },
        ],
      },
      {
        test: /\.(jade|pug)$/,
        include: /src/,
        use: [
          ...notOnCI({
            loader: "cache-loader",
            options: {
              cacheDirectory: path.join(cacheDirectory, "pug"),
            },
          }),
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
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
  plugins: [
    // TODO: Add webpack typechecker
    ...notOnCI(new SimpleProgressWebpackPlugin({ format: "compact" })),
    ...notOnCI(
      new HardSourceWebpackPlugin({
        cacheDirectory: path.join(cacheDirectory, "hard-source"),
        info: {
          mode: "none",
          level: "error",
        },
      })
    ),
    // Remove moment.js localization files
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      jade: "jade/runtime.js",
      waypoints: "jquery-waypoints/waypoints.js",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: 10, // lower number for larger "common.js" bundle size
    }),
  ],
  resolve: {
    alias: {
      "jquery.ui.widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",
      react: path.resolve("./node_modules/react"),
      "styled-components": path.resolve("./node_modules/styled-components"),
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
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules",
      // TODO: The problem with including /all/ node_modules directories is that
      //       when using npm-link it can bring in dev dependencies that we
      //       don’t need or worse are duplicates and lead to bugs. However,
      //       ignoring all non-hoisted modules now would probably lead to bugs
      //       as well.
      // path.resolve(__dirname, "node_modules"),
      // path.resolve(__dirname, "node_modules/@artsy/reaction/node_modules"),
    ],
    symlinks: false,
  },
  externals: {
    request: "request",
  },
}

if (isDevelopment) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  // Staging
} else if (isDeploy) {
  config.devtool = "#source-map"

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
