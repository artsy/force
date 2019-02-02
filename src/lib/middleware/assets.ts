import path from "path"
import fs from "fs"

const assetManifest = path.resolve(
  __dirname,
  "../../../public/assets/manifest.json"
)

let manifest = {}
try {
  manifest = JSON.parse(fs.readFileSync(assetManifest, { encoding: "utf8" }))
} catch (error) {
  console.error("[Force] Error parsing manifest:", error)
}

export const assetMiddleware = (_req, res, next) => {
  res.locals.asset = filename => {
    const manifestFile = manifest[filename]
    return manifestFile || filename
  }
  next()
}
