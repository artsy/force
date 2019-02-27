// @ts-check

const path = require("path")
const stripAnsi = require("strip-ansi")
const { DuplicatesPlugin } = require("inspectpack/plugin")
const { promises: fs } = require("fs")
const { NODE_ENV, basePath } = require("../../src/lib/environment")

const plugins = {
  duplicatesReport: new DuplicatesPlugin({
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

export const ciConfig = {
  mode: NODE_ENV,
  devtool: false,
  plugins: [plugins.duplicatesReport],
}
