import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { parse } from "url"
import artsyXapp from "@artsy/xapp"
import uuid from "node-uuid"
import fs from "fs"

/**
 * Contains the subset of sharify locals that are required for all force routes.
 */
export function sharifyLocalsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const ua = req.get("user-agent") || ""

  res.locals.sd.CURRENT_PATH = parse(req.url).pathname
  res.locals.sd.EIGEN = ua.match("Artsy-Mobile") != null

  // Inject some project-wide sharify data such as the session id, the current
  // path and the xapp token.
  res.locals.sd.SESSION_ID =
    req.session != null
      ? req.session.id != null
        ? req.session.id
        : (req.session.id = uuid.v1())
      : undefined
  res.locals.sd.ARTSY_XAPP_TOKEN = artsyXapp.token

  // Determines device type for non-responsive pages.
  res.locals.sd.IS_MOBILE = Boolean(
    (ua.match(/iPhone/i) && !ua.match(/iPad/i)) ||
      (ua.match(/Android/i) && ua.match(/Mobile/i)) ||
      ua.match(/Windows Phone/i) ||
      ua.match(/BB10/i) ||
      ua.match(/BlackBerry/i)
  )

  res.locals.sd.IS_TABLET = Boolean(
    (ua.match(/iPad/i) && ua.match(/Mobile/i)) ||
      // specifically targets Vivo
      (ua.match(/vivo/i) && ua.match(/Mobile/i)) ||
      // targets android devices that are not mobile
      (ua.match(/Android/i) && ua.match(/Mobile/i))
  )

  res.locals.sd.IS_GOOGLEBOT = Boolean(ua.match(/Googlebot/i))

  // Required to know the hashed dll name.try
  res.locals.sd.ASSET_LEGACY_ARTWORK_DLL = assetLegacyArtworkDllName()

  next()
}

function assetLegacyArtworkDllName(): string {
  let dllName
  if (dllName) {
    return dllName
  }
  try {
    const dllManifest = JSON.parse(
      fs.readFileSync("./manifest-legacy-artwork-dll.json", "utf-8")
    ) as any
    dllName = `legacy-artwork-dll.${dllManifest.name}.js`
  } catch {
    dllName = "legacy-artwork-dll.js"
  }
  return dllName
}
