import { HTML, Spacer } from "@artsy/palette"
import { VideoEmbed } from "Components/VideoEmbed"
import type { ComponentProps, FC } from "react"
import { Fragment } from "react"

interface HTMLWithVideoEmbedProps
  extends Omit<ComponentProps<typeof HTML>, "children"> {
  html: string
  onVideoPlay?: () => void
}

export const HTMLWithVideoEmbed: FC<HTMLWithVideoEmbedProps> = ({
  html,
  onVideoPlay,
  ...rest
}) => {
  const parts = parseHTMLWithVideos(html)

  if (parts.length === 1 && parts[0].type === "html") {
    return <HTML html={html} {...rest} />
  }

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part.type === "html" ? (
            <HTML html={part.content} {...rest} />
          ) : (
            <>
              {index > 0 && <Spacer y={2} />}
              <VideoEmbed embed={part.content} onPlay={onVideoPlay} />
              {index < parts.length - 1 && <Spacer y={2} />}
            </>
          )}
        </Fragment>
      ))}
    </>
  )
}

interface HTMLPart {
  type: "html" | "video"
  content: string
}

function parseHTMLWithVideos(html: string): HTMLPart[] {
  const iframeRegex = /<iframe[^>]*>.*?<\/iframe>/gi
  const parts: HTMLPart[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = iframeRegex.exec(html)) !== null) {
    const iframeTag = match[0]
    const matchIndex = match.index

    if (isVideoIframe(iframeTag)) {
      if (matchIndex > lastIndex) {
        const htmlBefore = html.substring(lastIndex, matchIndex)
        if (htmlBefore.trim()) {
          parts.push({ type: "html", content: htmlBefore })
        }
      }

      parts.push({ type: "video", content: iframeTag })
      lastIndex = matchIndex + iframeTag.length
    }
  }

  if (lastIndex < html.length) {
    const remainingHtml = html.substring(lastIndex)
    if (remainingHtml.trim()) {
      parts.push({ type: "html", content: remainingHtml })
    }
  }

  if (parts.length === 0) {
    parts.push({ type: "html", content: html })
  }

  return parts
}

function isVideoIframe(iframeTag: string): boolean {
  const videoProviders = [
    "youtube.com",
    "youtu.be",
    "vimeo.com",
    "player.vimeo.com",
  ]

  return videoProviders.some(provider =>
    iframeTag.toLowerCase().includes(provider),
  )
}
