// @ts-check

const fs = require("fs")
const path = require("path")
const stripAnsi = require("strip-ansi")
const { promisify } = require("util")
const { DuplicatesPlugin } = require("inspectpack/plugin")
const { NODE_ENV, basePath } = require("../../src/lib/environment")

const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

const plugins = {
  duplicatesReport: new DuplicatesPlugin({
    verbose: true,
    emitHandler(report) {
      const artifactsPath = path.join(basePath, ".artifacts")
      mkdir(artifactsPath)
        .catch(() => Promise.resolve()) // .artifact directory exists, continue...
        .then(() =>
          writeFile(
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

export const ciConfig = {
  mode: NODE_ENV,
  devtool: false,
  plugins: [plugins.duplicatesReport].filter(p => !!p),
}
