import { CDN_URL } from "Server/config"
import path from "path"
import fs from "fs"

const HINTS_PATH = path.join(process.cwd(), "public/assets", "early-hints.json")

export const getScriptEarlyHints = (): {
  scriptLinkHeaders: string[]
  scriptLinkPreloadTags: string[]
} => {
  let chunkFiles

  try {
    chunkFiles = JSON.parse(fs.readFileSync(HINTS_PATH, "utf-8"))
  } catch (error) {
    console.error(
      "[getScriptEarlyHints] Could not load webpack early-hints.json:",
      error
    )

    return {
      scriptLinkHeaders: [],
      scriptLinkPreloadTags: [],
    }
  }

  const cdnUrl = (() => {
    if (process.env.NODE_ENV === "development") {
      return ""
    }

    return CDN_URL
  })()

  const links = chunkFiles.reduce(
    (acc, file) => {
      acc.scriptLinkHeaders.push(`<${cdnUrl}${file}>; rel=preload; as=script`)
      acc.scriptLinkPreloadTags.push(
        `<link rel="preload" as="script" href="${cdnUrl}${file}">`
      )
      return acc
    },
    {
      scriptLinkHeaders: [],
      scriptLinkPreloadTags: [],
    }
  )

  return links
}

export const getImageEarlyHints = (
  html: string
): {
  imageLinkHeaders: string[]
  imageLinkPreloadTags: string[]
} => {
  // Matches <img src="..." fetchpriority="..." />
  const regex = /<img\s[^>]*\bfetchpriority=['"][^'"]*['"][^>]*\bsrc=['"]([^'"]+)['"]|<img\s[^>]*\bsrc=['"]([^'"]+)['"][^>]*\bfetchpriority=['"][^'"]*['"][^>]*>/gi

  const links = Array.from(
    html.matchAll(regex),
    match => match[1] || match[2]
  ).reduce(
    (acc, src) => {
      acc.imageLinkHeaders.push(`<${src}>; rel=preload; as=image`)
      acc.imageLinkPreloadTags.push(
        `<link rel="preload" as="image" href="${src}">`
      )
      return acc
    },
    {
      imageLinkHeaders: [] as string[],
      imageLinkPreloadTags: [] as string[],
    }
  )

  return links
}
