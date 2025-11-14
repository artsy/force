import fs from "fs"
import path from "path"
import { CDN_URL } from "Server/config"

const HINTS_PATH = path.join(process.cwd(), "dist", "early-hints.json")

const cdnUrl = (() => {
  if (process.env.NODE_ENV === "development") {
    return ""
  }

  return CDN_URL
})()

export const getEarlyHints = (
  headTags: any[],
): {
  linkHeaders: string[]
  linkPreloadTags: string[]
} => {
  const results = {
    linkHeaders: [] as string[],
    linkPreloadTags: [] as string[],
  }

  // Set link headers based on <link...> tags rendered into the head
  const linkTags = headTags.filter(
    tag =>
      tag.type === "link" &&
      tag.props?.rel === "preload" &&
      tag.props?.as === "image" &&
      !!tag.props?.href,
  )
  for (const linkTag of linkTags) {
    results.linkHeaders.push(
      `<${linkTag.props?.href}>; rel=preload; as=${linkTag.props?.as}`,
    )
  }

  // Also add initial js chunks to link headers and inject preload tags
  try {
    const chunkFiles = JSON.parse(fs.readFileSync(HINTS_PATH, "utf-8"))
    for (const file of chunkFiles) {
      results.linkHeaders.push(`<${cdnUrl}${file}>; rel=preload; as=script`)
      results.linkPreloadTags.push(
        `<link rel="preload" as="script" href="${cdnUrl}${file}">`,
      )
    }
  } catch (error) {
    console.error("[getEarlyHints] Could not load early-hints.json:", error)
  }

  return results
}
