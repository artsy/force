import path from "path"
import fs from "fs"
import chalk from "chalk"

const { CDN_URL, NODE_ENV } = process.env

export default function assetMiddleware(manifestFileName = "manifest.json") {
  if (NODE_ENV === "production") {
    const manifestPath = path.resolve(process.cwd(), manifestFileName)

    let manifest = {}
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }))
    } catch (error) {
      console.error(chalk.red("\n[Force] Error parsing manifest:"), error)
    }

    return (_req, res, next) => {
      res.locals.asset = filename => {
        let manifestFile = manifest[filename] || filename
        // TODO: Is this path still used? If no remove it.
        if (CDN_URL) {
          manifestFile = CDN_URL + manifestFile
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
