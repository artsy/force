import { CDN_URL } from "Server/config"
import path from "path"
import fs from "fs"

const HINTS_PATH = path.join(process.cwd(), "public/assets", "early-hints.json")

export const getWebpackEarlyHints = (): {
  linkHeaders: string[]
  linkPreloadTags: string[]
} => {
  let chunkFiles

  return {
    linkHeaders: [],
    linkPreloadTags: [],
  }

  try {
    chunkFiles = JSON.parse(fs.readFileSync(HINTS_PATH, "utf-8"))
  } catch (error) {
    console.error(
      "[getWebpackEarlyHints] Could not load webpack early-hints.json:",
      error
    )

    return {
      linkHeaders: [],
      linkPreloadTags: [],
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

  return links
}
