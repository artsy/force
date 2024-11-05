import path from "path"
import fs from "fs"
import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import { CDN_URL, GEMINI_CLOUDFRONT_URL, WEBFONT_URL } from "Server/config"

/**
 * Link headers allow 103: Early Hints to be sent to the client (by Cloudflare).
 * These should correspond to preconnect and preload items from html.ejs.
 * See: https://developers.cloudflare.com/cache/advanced-configuration/early-hints/
 */
export function linkHeadersMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  if (!res.headersSent) {
    res.header("Link", [
      `<${CDN_URL}>; rel=preconnect; crossorigin`,
      `<${GEMINI_CLOUDFRONT_URL}>; rel=preconnect; crossorigin`,
      `<${WEBFONT_URL}>; rel=preconnect; crossorigin`,
      `<${WEBFONT_URL}/all-webfonts.css>; rel=preload; as=style`,
      `<${WEBFONT_URL}/ll-unica77_regular.woff2>; rel=preload; as=font; crossorigin`,
      `<${WEBFONT_URL}/ll-unica77_medium.woff2>; rel=preload; as=font; crossorigin`,
      `<${WEBFONT_URL}/ll-unica77_italic.woff2>; rel=preload; as=font; crossorigin`,
      ...getWebpackHintHeaders(),
    ])
  }
  next()
}

const getWebpackHintHeaders = () => {
  let chunkFiles

  try {
    const earlyHintsPath = path.join(
      process.cwd(),
      "public/assets",
      "early-hints.json"
    )
    chunkFiles = JSON.parse(fs.readFileSync(earlyHintsPath, "utf-8"))
  } catch (error) {
    console.error(
      "[linkHeadersMiddleware] Could not load webpack early-hints.json:",
      error
    )
  }

  const cdnUrl = (() => {
    if (process.env.NODE_ENV === "development") {
      return ""
    }

    return CDN_URL
  })()

  const hintHeaders = chunkFiles.map(
    file => `<${cdnUrl}${file}>; rel=preload; as=script; crossorigin`
  )

  return hintHeaders
}
