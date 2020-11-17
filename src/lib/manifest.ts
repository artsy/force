import path from "path"
import fs from "fs"
import chalk from "chalk"

const { CDN_URL, NODE_ENV } = process.env

class ManifestManager {
  private loadError = false
  private manifest = {}

  constructor(private manifestFileName = "manifest.json") {
    const manifestPath = path.resolve(process.cwd(), this.manifestFileName)

    try {
      this.manifest = JSON.parse(
        fs.readFileSync(manifestPath, { encoding: "utf8" })
      )
    } catch (error) {
      console.error(chalk.red("\n[Force] Error parsing manifest:"), error)
      this.loadError = true
    }
  }

  public lookup(assetFilename) {
    if (this.loadError || NODE_ENV !== "production") {
      chalk.yellow(`[Asset Manager]: error or development -> ${assetFilename}`)
      return assetFilename
    }

    const manifestFile = this.manifest[assetFilename]
    if (!manifestFile) {
      chalk.yellow(
        `[Asset Manager]: manifest lookup failed -> ${assetFilename}`
      )
      return assetFilename
    }

    // TODO: Is this path still used? If not remove it.
    if (CDN_URL) {
      chalk.yellow(`[Asset Manager]: cdn -> ${CDN_URL + manifestFile}`)
      return CDN_URL + manifestFile
    }

    chalk.yellow(`[Asset Manager]: manifest found -> ${manifestFile}`)
    return manifestFile
  }
}

const loadedManifests = new Map<string, ManifestManager>()

export default function loadManifest(manifestFileName = "manifest.json") {
  if (loadedManifests.has(manifestFileName)) {
    return loadedManifests.get(manifestFileName)
  }
  const manifestManager = new ManifestManager(manifestFileName)
  loadedManifests.set(manifestFileName, manifestManager)
  return manifestManager
}
