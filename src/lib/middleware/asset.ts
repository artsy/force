import type { NextFunction, RequestHandler } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import path from "path"
import fs from "fs"
import chalk from "chalk"

const { CDN_URL, NODE_ENV } = process.env

/**
 * Production, leverage the manifest to lookup hashed assets and leveerage the
 * CDN when possible.
 */
function productionAssets(manifestFileName: string): RequestHandler {
  const manifestPath = path.resolve(process.cwd(), manifestFileName)

  let manifest = {}
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }))
  } catch (error) {
    console.error(chalk.red("\n[Force] Error parsing manifest:"), error)
  }

  return (_req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    res.locals.asset = filename => {
      let manifestFile = manifest[filename] || filename
      // There are a few files that exist in the CDN and not the manifest this
      // ensures that they have the correct path.
      // - /images/browserconfig.xml
      // - /images/opensearch.xml
      if (CDN_URL) {
        manifestFile = CDN_URL + manifestFile
      }
      return manifestFile
    }
    next()
  }
}

/**
 * Development, return the file being requested and don't look for a manifest
 */
function developmentAssets(): RequestHandler {
  return (_req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    res.locals.asset = filename => filename
    next()
  }
}

export function assetMiddleware(
  manifestFileName = "manifest.json"
): RequestHandler {
  if (NODE_ENV === "production") {
    return productionAssets(manifestFileName)
  } else {
    return developmentAssets()
  }
}
