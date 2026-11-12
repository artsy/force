import { parseVimeoMessage } from "Components/LoopingVimeoVideo/utils/vimeo"
import { type RefObject, useCallback, useEffect, useState } from "react"

const VIMEO_ORIGIN = "https://player.vimeo.com"
const EVENTS = ["play", "pause", "error"]

// A background video that has not played this long after the iframe mounted
// is treated as broken.
const START_TIMEOUT_MS = 8000

/**
 * Drives a Vimeo iframe over its postMessage protocol, as Vimeo's player.js
 * does. `src` is a dependency so the listener follows the iframe when it is
 * recreated.
 */
export const useVimeoPlayer = ({
  iframeRef,
  src,
  shouldAutoplay,
}: {
  iframeRef: RefObject<HTMLIFrameElement>
  src: string | null
  shouldAutoplay: boolean
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  const post = useCallback(
    (message: { method: string; value?: string }) => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify(message),
        VIMEO_ORIGIN,
      )
    },
    [iframeRef],
  )

  useEffect(() => {
    if (!src) return

    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== VIMEO_ORIGIN ||
        event.source !== iframeRef.current?.contentWindow
      ) {
        return
      }

      const message = parseVimeoMessage(event.data)

      if (!message) {
        return
      }

      switch (message.event) {
        case "ready":
          EVENTS.forEach(value => {
            post({ method: "addEventListener", value })
          })
          break
        case "play":
          setIsPlaying(true)
          setHasStarted(true)
          break
        case "pause":
          setIsPlaying(false)
          break
        case "error":
          // Browsers refuse a play() without a user gesture; the button can
          // still start the video, so that is not a broken player.
          if (message.errorName !== "NotAllowedError") {
            setHasFailed(true)
          }
          break
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [src, iframeRef, post])

  useEffect(() => {
    if (!src || !shouldAutoplay || hasStarted) return

    const timeout = setTimeout(() => {
      setHasFailed(true)
    }, START_TIMEOUT_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [src, shouldAutoplay, hasStarted])

  const play = useCallback(() => post({ method: "play" }), [post])
  const pause = useCallback(() => post({ method: "pause" }), [post])

  return { isPlaying, hasStarted, hasFailed, play, pause }
}
