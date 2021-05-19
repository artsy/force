import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { parse } from "url"
import artsyXapp from "@artsy/xapp"
import uuid from "node-uuid"
import fs from "fs"
import { getAsyncLocalStorage } from "lib/asyncLocalWrapper"

/**
 * Contains the subset of sharify locals that are required for all force routes.
 */
export function bootstrapSharifyAndContextLocalsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const ua = req.get("user-agent") || ""

  updateSharifyAndContext(res, "CURRENT_PATH", parse(req.url).pathname)
  updateSharifyAndContext(res, "EIGEN", ua.match("Artsy-Mobile") != null)

  // Inject some project-wide sharify data such as the session id, the current
  // path and the xapp token.
  updateSharifyAndContext(
    res,
    "SESSION_ID",
    req.session != null
      ? req.session.id != null
        ? req.session.id
        : (req.session.id = uuid.v1())
      : undefined
  )
  updateSharifyAndContext(res, "ARTSY_XAPP_TOKEN", artsyXapp.token)

  // Determines device type for non-responsive pages.
  updateSharifyAndContext(
    res,
    "IS_MOBILE",
    Boolean(
      (ua.match(/iPhone/i) && !ua.match(/iPad/i)) ||
        (ua.match(/Android/i) && ua.match(/Mobile/i)) ||
        ua.match(/Windows Phone/i) ||
        ua.match(/BB10/i) ||
        ua.match(/BlackBerry/i)
    )
  )

  updateSharifyAndContext(
    res,
    "IS_TABLET",
    Boolean(
      (ua.match(/iPad/i) && ua.match(/Mobile/i)) ||
        // specifically targets Vivo
        (ua.match(/vivo/i) && ua.match(/Mobile/i)) ||
        // targets android devices that are not mobile
        (ua.match(/Android/i) && ua.match(/Mobile/i))
    )
  )

  updateSharifyAndContext(res, "IS_GOOGLEBOT", Boolean(ua.match(/Googlebot/i)))

  updateSharify(res, "IP_ADDRESS", req.ip)

  // Required to know the hashed dll name.try
  updateSharifyAndContext(
    res,
    "ASSET_LEGACY_ARTWORK_DLL",
    assetLegacyArtworkDllName()
  )
  updateSharifyAndContext(
    res,
    "LEGACY_MAIN_CSS",
    res.locals.asset("/assets/main_layout.css")
  )

  next()
}

/**
 * Updates both the sharify locals for template injection along with the context
 * globals for the request.
 */
function updateSharifyAndContext(res, key, value) {
  res.locals.sd[key] = value
  const asyncLocalStorage = getAsyncLocalStorage()
  asyncLocalStorage.getStore()?.set(key, value)
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
