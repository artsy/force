import { getVimeoThumbnailUrl } from "Components/LoopingVimeoVideo/utils/vimeo"

const YOUTUBE_ID_PATTERN =
  /(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/

export const isYouTubeUrl = (playerUrl: string) => {
  return YOUTUBE_ID_PATTERN.test(playerUrl)
}

export const getVideoPosterUrl = async (playerUrl: string) => {
  const youTubeId = playerUrl.match(YOUTUBE_ID_PATTERN)?.[1]

  if (youTubeId) {
    return `https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`
  }

  return getVimeoThumbnailUrl(playerUrl)
}

export const getAutoplayUrl = (playerUrl: string) => {
  try {
    const url = new URL(playerUrl)
    url.searchParams.set("autoplay", "1")

    // Vimeo needs this on every player on the page, or starting this one
    // pauses the silent loops.
    if (!isYouTubeUrl(playerUrl)) {
      url.searchParams.set("autopause", "0")
    }

    return url.toString()
  } catch {
    return null
  }
}
