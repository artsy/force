const VIMEO_ID_PATTERN = /player\.vimeo\.com\/video\/(\d+)/

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null
}

export interface VimeoMessage {
  event: string
  errorName?: string
}

/**
 * Reads a message from the Vimeo iframe. Vimeo sends a JSON string or an
 * object, and nothing about its shape is guaranteed, so anything that does not
 * carry a string `event` is dropped.
 */
export const parseVimeoMessage = (raw: unknown): VimeoMessage | null => {
  let message: unknown = raw

  if (typeof raw === "string") {
    try {
      message = JSON.parse(raw)
    } catch {
      return null
    }
  }

  if (!isRecord(message) || typeof message.event !== "string") {
    return null
  }

  const { data } = message
  const errorName =
    isRecord(data) && typeof data.name === "string" ? data.name : undefined

  return { event: message.event, errorName }
}

export const getVimeoBackgroundUrl = (
  playerUrl: string,
  shouldAutoplay = true,
) => {
  try {
    const url = new URL(playerUrl)

    url.searchParams.set("background", "1")
    url.searchParams.set("muted", "1")
    url.searchParams.set("loop", "1")
    url.searchParams.set("autoplay", shouldAutoplay ? "1" : "0")

    return url.toString()
  } catch {
    return null
  }
}

export const getVimeoThumbnailUrl = async (playerUrl: string) => {
  const id = playerUrl.match(VIMEO_ID_PATTERN)?.[1]

  if (!id) {
    return null
  }

  const privacyHash = new URL(playerUrl).searchParams.get("h")
  const pageUrl = `https://vimeo.com/${id}${privacyHash ? `/${privacyHash}` : ""}`

  const response = await fetch(
    `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(pageUrl)}&width=1920`,
  )

  if (!response.ok) {
    return null
  }

  const data: unknown = await response.json()

  return isRecord(data) && typeof data.thumbnail_url === "string"
    ? data.thumbnail_url
    : null
}
