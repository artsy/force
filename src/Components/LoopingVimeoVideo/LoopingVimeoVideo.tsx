import { Box, Clickable, Image, Theme } from "@artsy/palette"
import { useVimeoPlayer } from "Components/LoopingVimeoVideo/hooks/useVimeoPlayer"
import {
  getVimeoBackgroundUrl,
  getVimeoThumbnailUrl,
} from "Components/LoopingVimeoVideo/utils/vimeo"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { useEffect, useRef, useState } from "react"

interface LoopingVimeoVideoProps {
  /** The `Video.playerUrl` of a Vimeo video */
  playerUrl: string
  /** Width divided by height of the video */
  aspectRatio: number
  title: string
  /** Shown until the video plays. Falls back to the Vimeo thumbnail. */
  posterUrl?: string | null
  onPlay?: () => void
  onPause?: () => void
  /** The player errored, or did not start by itself in time. */
  onError?: () => void
}

/**
 * A silent, looping Vimeo background video that fills its parent, with a
 * play/pause button. With `prefers-reduced-motion` it shows a poster and waits
 * for the visitor to press play.
 *
 * `onPlay` and `onPause` fire only for the button, not for autoplay.
 */
export const LoopingVimeoVideo: React.FC<LoopingVimeoVideoProps> = ({
  playerUrl,
  aspectRatio,
  title,
  posterUrl,
  onPlay,
  onPause,
  onError,
}) => {
  const prefersReducedMotion = __internal__useMatchMedia(
    "(prefers-reduced-motion: reduce)",
  )
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  const isReady = prefersReducedMotion !== null
  const src = isReady
    ? getVimeoBackgroundUrl(playerUrl, !prefersReducedMotion)
    : null

  useEffect(() => {
    if (!prefersReducedMotion || posterUrl) {
      return
    }

    let isCancelled = false

    getVimeoThumbnailUrl(playerUrl)
      .then(url => {
        if (!isCancelled) setThumbnailUrl(url)
      })
      .catch(error => {
        console.error(error)
      })

    return () => {
      isCancelled = true
    }
  }, [prefersReducedMotion, posterUrl, playerUrl])

  const { isPlaying, hasStarted, hasFailed, play, pause } = useVimeoPlayer({
    iframeRef,
    src,
    shouldAutoplay: !prefersReducedMotion,
  })

  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  useEffect(() => {
    if (hasFailed) onErrorRef.current?.()
  }, [hasFailed])

  const handleToggle = () => {
    if (isPlaying) {
      pause()
      onPause?.()
      return
    }

    play()
    onPlay?.()
  }

  const poster = posterUrl ?? thumbnailUrl

  // Always sits on video, so it renders with the light theme in every mode:
  // mono100 stays black and mono0 stays white.
  return (
    <Theme theme="light">
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        bg="mono100"
        // clip, unlike hidden, is not a scroll container, so the oversized
        // iframe cannot scroll the toggle out of view.
        overflow="clip"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ containerType: "size" }}
      >
        {src && (
          // Vimeo letterboxes the video inside its iframe, so the iframe is
          // sized to cover the container and flex centering crops it evenly.
          <Box
            as="iframe"
            ref={iframeRef}
            src={src}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            tabIndex={-1}
            flexShrink={0}
            width={`max(100cqw, calc(100cqh * ${aspectRatio}))`}
            height={`max(100cqh, calc(100cqw / ${aspectRatio}))`}
            border={0}
            pointerEvents="none"
          />
        )}

        {poster && !hasStarted && (
          <Box position="absolute" top={0} left={0} width="100%" height="100%">
            <Image
              src={poster}
              alt=""
              width="100%"
              height="100%"
              lazyLoad={false}
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}

        {!hasFailed && (
          <Clickable
            aria-label={isPlaying ? "Pause video" : "Play video"}
            onClick={handleToggle}
            position="absolute"
            top="16px"
            right="16px"
            zIndex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={40}
            height={40}
            borderRadius="50%"
            background="rgba(255, 255, 255, 0.2)"
            color="mono0"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              {isPlaying ? (
                <>
                  <rect x="2" y="1.5" width="2.8" height="9" rx=".6" />
                  <rect x="7.2" y="1.5" width="2.8" height="9" rx=".6" />
                </>
              ) : (
                <path d="M3 1.6v8.8a.4.4 0 0 0 .6.35l7-4.4a.4.4 0 0 0 0-.7l-7-4.4A.4.4 0 0 0 3 1.6Z" />
              )}
            </svg>
          </Clickable>
        )}
      </Box>
    </Theme>
  )
}
