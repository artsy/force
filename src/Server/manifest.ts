import path from "path"
import fs from "fs"
import chalk from "chalk"

const { CDN_URL, NODE_ENV } = process.env

class ManifestManager {
  private loadError = false
  private manifest: { [key: string]: string } = {}

  constructor(private manifestFileName = "manifest.json") {
    const manifestPath = path.resolve(process.cwd(), this.manifestFileName)

    try {
      this.manifest = JSON.parse(
        fs.readFileSync(manifestPath, { encoding: "utf8" })
      )
    } catch (error) {
      if (NODE_ENV === "production") {
        console.error(
          chalk.red("\n[Force] Error parsing manifest:"),
          error.message
        )
      } else {
        console.warn("[Force] Manifest is generating.")
      }
      this.loadError = true
    }
  }

  public lookup(assetFilename: string) {
    if (this.loadError || NODE_ENV !== "production") {
      return assetFilename
    }

    let canonicalFilename = this.applyManifest(assetFilename)
    canonicalFilename = this.applyCdn(canonicalFilename)
    return canonicalFilename
  }

  private applyManifest(filename: string) {
    const manifestFile = this.manifest[filename]
    if (!manifestFile || manifestFile.length === 0) {
      return filename
    }
    return manifestFile
  }

  private applyCdn(filename: string) {
    // There are a few files that exist in the CDN and not the manifest this
    // ensures that they have the correct path.
    // - /images/browserconfig.xml
    // - /images/opensearch.xml
    if (CDN_URL) {
      return CDN_URL + filename
    }
    return filename
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
