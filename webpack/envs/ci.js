// @ts-check

import { NODE_ENV, basePath } from "../../src/lib/environment"

import { promises as fs } from "fs"
import { DuplicatesPlugin } from "inspectpack/plugin"
import path from "path"
import stripAnsi from "strip-ansi"

export const ciConfig = {
  mode: NODE_ENV,
  devtool: false,
  plugins: [
    new DuplicatesPlugin({
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
  ],
}
