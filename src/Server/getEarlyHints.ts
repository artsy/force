import { CDN_URL } from "Server/config"
import path from "path"
import fs from "fs"

const HINTS_PATH = path.join(process.cwd(), "dist", "early-hints.json")
const PRIORITY_IMAGE_REGEX = /<img\s[^>]*fetchpriority="high"[^>]*>/gi
const IMAGE_SRC_REGEX = /\bsrc="([^"]+)"/i

const cdnUrl = (() => {
  if (process.env.NODE_ENV === "development") {
    return ""
  }

  return CDN_URL
})()

export const getEarlyHints = (
  body: string
): {
  linkHeaders: string[]
  linkPreloadTags: string[]
} => {
  let chunkFiles

  try {
    chunkFiles = JSON.parse(fs.readFileSync(HINTS_PATH, "utf-8"))
  } catch (error) {
    console.error("[getEarlyHints] Could not load early-hints.json:", error)

    return {
      linkHeaders: [],
      linkPreloadTags: [],
    }
  }

  const links = chunkFiles.reduce(
    (acc, file) => {
      acc.linkHeaders.push(`<${cdnUrl}${file}>; rel=preload; as=script`)
      acc.linkPreloadTags.push(
        `<link rel="preload" as="script" href="${cdnUrl}${file}">`
      )
      return acc
    },
    {
      linkHeaders: [],
      linkPreloadTags: [],
    }
  )

  const mainImage = body.match(PRIORITY_IMAGE_REGEX)?.[0]
  const mainImageSrc = mainImage?.match(IMAGE_SRC_REGEX)?.[1]
  if (mainImageSrc)
    links.linkHeaders.unshift(`<${mainImageSrc}>; rel=preload; as=image`)

  return links
}
