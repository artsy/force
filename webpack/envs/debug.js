import { promises as fs } from "fs"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { DuplicatesPlugin } from "inspectpack/plugin"
import path from "path"
import stripAnsi from "strip-ansi"

import { NODE_ENV, basePath } from "../../src/lib/environment"

export const plugins = {
  bundleAnalyzer: new BundleAnalyzerPlugin(),
  duplicates: new DuplicatesPlugin({
    verbose: true,
    emitHandler(report) {
      const artifactsPath = path.join(basePath, ".artifacts")
      fs
        .mkdir(artifactsPath)
        .catch(() => Promise.resolve()) // .artifact directory exists, continue...
        .then(() =>
          fs.writeFile(
            path.join(artifactsPath, "duplicates-report"),
            stripAnsi(report)
          )
        )
        .catch(err => {
          console.error(
            "[DuplicatesPlugin] Could not write duplicates report",
            err
          )
        })
    },
  }),
}

export const debugConfig = {
  mode: NODE_ENV,
  plugins: [plugins.bundleAnalyzer, plugins.duplicates],
}
