interface RsbuildManifestEntry {
  initial?: {
    js?: string[]
    css?: string[]
  }
}

export interface RsbuildManifest {
  entries: Record<string, RsbuildManifestEntry | undefined>
}

interface ExtractStyleLinkTagsParams {
  manifest: RsbuildManifest
  cdnUrl?: string
}

export const extractStyleLinkTags = ({
  manifest,
  cdnUrl = "",
}: ExtractStyleLinkTagsParams): string => {
  const css = manifest.entries.index?.initial?.css ?? []

  return css
    .map(url => {
      return `<link rel="stylesheet" href="${cdnUrl}${url}">`
    })
    .join("")
}
