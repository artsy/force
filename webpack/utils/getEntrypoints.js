// @ts-check

import path from "path"
import fs from "fs"
import { basePath, env } from "./env"

export function getEntrypoints() {
  return {
    ...findAssets("src/desktop/assets"),
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
      [`legacy-${fileName}`]: [path.join(basePath, folder, file)],
    }

    // Load old global module dependencies
    asset[`legacy-${fileName}`].unshift(
      path.join(basePath, "./src/lib/global_modules")
    )
    if (env.isDevelopment) {
      asset[`legacy-${fileName}`].unshift(
        "webpack-hot-middleware/client?name=force&reload=true"
      )
    }

    return {
      ...assetMap,
      ...asset,
    }
  }, {})

  return assets
}
