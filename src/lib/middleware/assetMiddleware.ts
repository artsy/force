import path from "path"
import fs from "fs"
import chalk from "chalk"
import { isProduction, S3_BUCKET } from "lib/environment"

export const assetMiddleware = () => {
  if (isProduction) {
    const manifestPath = path.resolve(process.cwd(), "manifest.json")

    let manifest = {}
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }))
    } catch (error) {
      console.error(chalk.red("\n[Force] Error parsing manifest:"), error)
    }

    return (_req, res, next) => {
      res.locals.asset = filename => {
        let manifestFile
        if (manifest[filename]) {
          manifestFile = S3_BUCKET + manifest[filename]
        } else {
          manifestFile = filename
        }
        return manifestFile
      }
      next()
    }

    // Development, return the file being requested and don't look for a manifest
  } else {
    return (_req, res, next) => {
      res.locals.asset = filename => filename
      next()
    }
  }
}
