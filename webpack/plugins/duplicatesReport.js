// @ts-check

const fs = require("fs")
const path = require("path")
const stripAnsi = require("strip-ansi")
const { promisify } = require("util")
const { DuplicatesPlugin } = require("inspectpack/plugin")
const merge = require("webpack-merge")
const { basePath, env } = require("../utils/env")

const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

export function duplicatesReport(config) {
  if (!env.enableWebpackDuplicates && !env.onCi) {
    return config
  }

  return merge.smart(config, {
    devtool: false,
    plugins: [
      new DuplicatesPlugin({
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
    ],
  })
}
