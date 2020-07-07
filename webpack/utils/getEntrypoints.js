// @ts-check

const path = require("path")
const fs = require("fs")
const { basePath, env } = require("./env")

export function getEntrypoints() {
  return {
    ...findAssets("src/desktop/assets"),
    ...findAssets("src/mobile/assets"),
  }
}

function findAssets(folder) {
  const files = fs.readdirSync(path.resolve(basePath, folder))

  // Filter out .styl files
  const validAssets = file => {
    const isValid = /\.(js|ts|coffee)x?/.test(path.extname(file))
    return isValid
  }

  /**
   * Construct key/value pairs representing Webpack entrypoints; e.g.,
   * {
   *   desktop: [ path/to/desktop.js ],
   *   mobile: [ ... ]
   * }
   */
  const assets = files.filter(validAssets).reduce((assetMap, file) => {
    const fileName = path.basename(file, path.extname(file))
    const asset = {
      [fileName]: [path.join(basePath, folder, file)],
    }

    // Load old global module dependencies
    asset[fileName].unshift(path.join(basePath, "./src/lib/global_modules"))
    if (env.isDevelopment) {
      asset[fileName].unshift("webpack-hot-middleware/client?reload=true")
    }

    return {
      ...assetMap,
      ...asset,
    }
  }, {})

  return assets
}
