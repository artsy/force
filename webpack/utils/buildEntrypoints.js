// @ts-check

import path from "path"
import fs from "fs"
import {
  // ENABLE_EXPERIMENTAL_ASSET_BUNDLING,
  isDevelopment,
  basePath,
} from "./environment"

export function buildEntrypoints() {
  return {
    ...findAssets("src/desktop/assets"),
    ...findAssets("src/mobile/assets"),
  }
}

function findAssets(folder) {
  const files = fs.readdirSync(path.resolve(basePath, folder))

  // Filter out .styl files
  const validAssets = file => {
    const whitelist = [".js", ".coffee"]
    const isValid = whitelist.some(
      extension => extension === path.extname(file)
    )

    // // FIXME: Remove once bucket-assets is removed
    // if (ENABLE_EXPERIMENTAL_ASSET_BUNDLING) {
    //   const assetWhitelist = [
    //     "analytics",
    //     "artist",
    //     "artists_artworks",
    //     "artwork2",
    //     "collect2",
    //     "collections",
    //     "home",
    //     "main_layout",
    //     "order2",
    //   ].some(fileMatch => isValid && file.includes(fileMatch))

    //   return assetWhitelist
    // }

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
